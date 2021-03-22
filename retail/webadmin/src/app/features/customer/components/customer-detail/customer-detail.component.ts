import { DEFAULT_IMAGE, MODULES, REMARKS_LIST } from "@shared/constants/app.constants";
import { b64DecodeUnicode, camelToSentenceCase, camelToSnakeCaseText, getRecentRecord, snakeToCamelObject, uniqeBy } from "@shared/helpers/global.helper";
import {
    AfterContentChecked,
    Component,
    Inject,
    Injector,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { environment } from "@env/environment";
import { fuseAnimations } from "@fuse/animations";
import {
    Gallery,
    GalleryItem,
    ImageItem,
    ThumbnailsPosition,
    ImageSize,
} from "@ngx-gallery/core";
import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '@feature/customer/customer.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { MESSAGES } from "@shared/constants/messages.constant";

@Component({
    selector: "app-customer-detail",
    templateUrl: "./customer-detail.component.html",
    styleUrls: ["./customer-detail.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class CustomerDetailComponent extends BaseComponent implements OnInit, AfterContentChecked {

    nationalIdDocuments: GalleryItem[];
    passportDocuments: GalleryItem[];
    screenShots: GalleryItem[];
    FATCA: any;
    amlData: any;
    bankingTransaction: any;
    passportProcessed: any;
    civilIdBackProcessed: any;
    enabledField: string;
    customer: any;
    customerReponse: any;
    screenShotsResponse: any;
    screenShotsMapped = [];
    remarksList = REMARKS_LIST;
    remarksForm: FormGroup;
    customerForm: FormGroup;
    isCreateAccount: boolean;
    amlResponse: any;
    updatedResponse:any;

    constructor(
        public gallery: Gallery,
        public matDialogRef: MatDialogRef<CustomerDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private authService: AuthenticationService,
        private customerService: CustomerService,
        injector: Injector
    ) {
        super(injector, MODULES.CUSTOMERS);
        super.ngOnInit();
    }

    ngOnInit(): void {
        this.customerReponse = this.data[0];
        this.screenShotsResponse = this.data[1];
        this.initData();
        this.remarksForm = new FormGroup({
            remarks: new FormControl(this.customerReponse.remarks,),
            status: new FormControl(this.customerReponse.status, [Validators.required]),
        });
        this.customerForm = new FormGroup({
            firstName: new FormControl(this.customerReponse.first_name,),
            middleName: new FormControl(this.customerReponse.middle_name),
            lastName: new FormControl(this.customerReponse.last_name),
        });
    }
    initData(): void {

        let data = this.customerReponse.templates?.map((item) => {
            return {
                ...item, results: JSON.parse(b64DecodeUnicode(item.results))
            }
        });
        data = data ? data : [];

        const civilIdBackProcessData =
            this.customerReponse.documents.length > 0
                ? this.customerReponse.documents.find(
                    (x) => x.name === "NATIONAL_ID_BACK_SIDE"
                )
                : null;

        this.civilIdBackProcessed = civilIdBackProcessData
            ? JSON.parse(civilIdBackProcessData.processed_data)?.mrz
            : null;
        const passportProcessData =
            this.customerReponse.documents.length > 0
                ? this.customerReponse.documents.find(
                    (x) => x.name === "PASSPORT"
                )
                : null;
        this.passportProcessed = passportProcessData
            ? JSON.parse(passportProcessData.processed_data)?.mrz
            : null;
        this.customer = snakeToCamelObject(this.customerReponse);
        this.FATCA = data.find((x) => x.results.name === "FATCA");
        const bankingTransaction = data.filter((x) => x.results.name === "Banking Transactions");
        this.bankingTransaction = getRecentRecord(bankingTransaction, 'created_on');
        const amlResponse = this.customerReponse.amlResponses ? this.customerReponse.amlResponses[0] : null;
        if (amlResponse && amlResponse.responses) {
            this.amlResponse = getRecentRecord(amlResponse.responses, 'created_on');
            this.amlResponse['response_text'] = JSON.parse(this.amlResponse['response_text'])
        }

        const _nationalIdDocuments = [
            {
                title: "National Id Back",
                type: "NATIONAL_ID_BACK_SIDE",
                isExtracted: false,
            },
            {
                title: "National Id Front",
                type: "NATIONAL_ID_FRONT_SIDE",
                isExtracted: false,
            },
            {
                title: "National Id Face",
                type: "NATIONAL_ID_FRONT_SIDE",
                isExtracted: true,
            },
        ];

        const _passportDocuments = [
            { title: "Passport", type: "PASSPORT", isExtracted: false },
            { title: "Passport Face", type: "PASSPORT", isExtracted: true },
        ];
        this.findScreenShotType(
            "Civil Id Front",
            "NATIONAL_ID_FRONT_SIDE_SCREENSHOT"
        );
        this.findScreenShotType(
            "Civil Id Back",
            "NATIONAL_ID_BACK_SIDE_SCREENSHOT"
        );

        this.findScreenShotType("Passport", "PASSPORT_SCREENSHOT");
        this.findScreenShotType("Address", "ADDRESS_SCREENSHOT");
        this.findScreenShotType("Visa", "VISA_SCREENSHOT");

        this.nationalIdDocuments = _nationalIdDocuments.map((item) => {
            const url = this.previewDocumentUrl(item.type, item.isExtracted);
            return new ImageItem({ src: url, thumb: url, title: item.title });
        });

        this.passportDocuments = _passportDocuments.map((item) => {
            const url = this.previewDocumentUrl(item.type, item.isExtracted);
            return new ImageItem({ src: url, thumb: url, title: item.title });
        });
        this.screenShots = this.screenShotsMapped.map((item) => {
            const url = this.previewScreenShotUrl(item.id);
            return new ImageItem({ src: url, thumb: url, title: item.title });
        });

        this.basicLightboxExample(this.passportDocuments);
        this.basicLightboxExample(this.nationalIdDocuments);
        this.basicLightboxExample(this.screenShots);

        // Load item into different lightbox instance
        // With custom gallery config
        this.withCustomGalleryConfig(
            "passportDocuments",
            this.passportDocuments
        );
        this.withCustomGalleryConfig("screenshots", this.screenShots);

        this.withCustomGalleryConfig(
            "nationalIdDocuments",
            this.nationalIdDocuments
        );
    }

    findScreenShotType(title, type) {
        const data = this.screenShotsResponse.find(
            (x) => x.attachment_type == type
        );
        if (data) {
            this.screenShotsMapped.push({ id: data.id, title });
        }
    }
    ngAfterContentChecked(): void {
        const el = document.querySelectorAll(".g-image-item");
        el.forEach((x) => {
            x["style"].backgroundSize = "contain";
        });
    }
    basicLightboxExample(items): void {
        this.gallery.ref().load(items);
    }

    getUrl(url): string {
        return `${environment.RETAIL_API_BASE_URL}/api/v1${url}`;
    }

    previewDocumentUrl(type, isExtracted): string {
        const tenantId = environment.TENANT_ID;
        const channelId = environment.CHANNEL_ID;
        const token = this.authService.accessToken;
        const customerId = this.customerReponse.id;

        const document = this.customerReponse.documents.find(
            (x) => x.name === type
        );
        if (!document) {
            return DEFAULT_IMAGE;
        }

        let url = `/onboarding/customers/${customerId}/documents/${document.id}/preview?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}`;
        if (isExtracted) {
            url = `${url}&extracted-image=true`;
        }
        return this.getUrl(url);
    }
    previewScreenShotUrl(attachmentId) {
        const tenantId = environment.TENANT_ID;
        const channelId = environment.CHANNEL_ID;
        const token = this.authService.accessToken;
        const customerId = this.customerReponse.id;

        let url = `/onboarding/customers/${customerId}/attachments/${attachmentId}?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}`;
        return this.getUrl(url);
    }
    withCustomGalleryConfig(element, images): void {
        const lightboxGalleryRef = this.gallery.ref(element);

        lightboxGalleryRef.setConfig({
            imageSize: ImageSize.Cover,
            thumbPosition: ThumbnailsPosition.Top,
        });

        lightboxGalleryRef.load(images);
    }

    onSubmit() {
        const model = this.remarksForm.value;
   
        this.customerService.updateCustomer(this.customer.id, model).subscribe((response) => {
            if (model.status === 'ACCEPTED') {
                this.createAccount();
                return;
            } else {
                this._notifier.success('Remarks added successfully')
            }
        },
            (response) => super.onError(response))
    }
    createAccount() {
        this.customerService.createAccount(this.customer.id)
            .subscribe((response) => {
                this._notifier.success('Account created successfully')
            }, (response) => super.onError(response))
    }
    getAMLData() {
        this.customerService.getAMLData(this.customer.id)
            .subscribe((response) => {
                const parsedResponse = getRecentRecord(response.responses, 'created_on');
                parsedResponse['response_text'] = JSON.parse(parsedResponse['response_text']);

                if (parsedResponse['response_text'].error || parsedResponse['response_text'].status === 400) {
                    this._notifier.error(MESSAGES.UNKNOWN);
                    return;
                }
                this.amlResponse = parsedResponse;
                this._notifier.success('AML data fetched successfully.');
            }, (response) => super.onError(response))
    }

    onMouseEnter(field) {
        console.log(field)
        this.enabledField = field;
    }
    onMouseLeave() {
        this.enabledField = null;
    }
    onResetEditControl(control) {
        this.customerForm.patchValue({ [control]: this.customerReponse[camelToSnakeCaseText(control)] })
    }

    updateCustomer(field) {
        const newValue = this.customerForm.get(field).value;
        const oldValue = this.customerReponse[camelToSnakeCaseText(field)]
        if (newValue == oldValue) return;

        this.customerService.updateCustomer(this.customer.id, { [camelToSnakeCaseText(field)]: this.customerForm.get(field).value })
            .subscribe((response) => {
                this.updatedResponse=response;
                this._notifier.success(`${camelToSentenceCase(field)} updated successfully`);

            }, (response) => super.onError(response))
    }
}
