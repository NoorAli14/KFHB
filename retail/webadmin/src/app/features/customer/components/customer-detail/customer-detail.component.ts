import { CUSTOMER_STATUSES, DEFAULT_IMAGE, MODULES, REMARKS_LIST, STATUS_LIST } from "@shared/constants/app.constants";
import { b64DecodeUnicode, camelToSentenceCase, camelToSnakeCaseText, getRecentRecord, snakeToCamelObject, constantCaseToSentenceCase } from "@shared/helpers/global.helper";
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
    guardianNationalIdDocuments: GalleryItem[];
    passportDocuments: GalleryItem[];
    guardianPassportDocuments: GalleryItem[];
    screenShots: GalleryItem[];
    additionalDocuments: GalleryItem[];
    FATCA: any;
    amlData: any;
    bankingTransaction: any;
    kycData: any;
    crsTemplate: any;
    passportProcessed: any;
    guardianPassportProcessed: any;
    civilIdBackProcessed: any;
    guardianCivilIdBackProcessed: any;
    enabledField: string;
    customer: any;
    customerReponse: any;
    attachmentsResponse: any;
    screenshotsResponse: any;
    additionalDocsResponse: any;
    screenShotsMapped = [];
    additionalDocsMapped = [];
    remarksList = REMARKS_LIST;
    remarksForm: FormGroup;
    customerForm: FormGroup;
    guardianForm: FormGroup;
    isCreateAccount: boolean;
    amlResponse: any;
    updatedResponse: any;

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
        this.attachmentsResponse = this.data[1];

        const customerId = this.customerReponse.id;
        this.screenshotsResponse = this.attachmentsResponse?.filter(x => x.created_by != customerId);
        this.additionalDocsResponse = this.attachmentsResponse?.filter(x => x.created_by == customerId);
        this.initData();

        this.updateRemarksOptionsForStatus(this.customerReponse.status);

        this.remarksForm = new FormGroup({
            remarks: new FormControl(this.customerReponse.remarks, [Validators.required]),
            status: new FormControl(this.customerReponse.status, [Validators.required]),
        });
        this.customerForm = new FormGroup({
            firstName: new FormControl(this.customerReponse.first_name,),
            middleName: new FormControl(this.customerReponse.middle_name),
            lastName: new FormControl(this.customerReponse.last_name),
        });
        const guardian: any = this.customerReponse?.guardians && this.customerReponse?.guardians.length > 0 ? snakeToCamelObject(this.customerReponse?.guardians[0]) : null;
        this.guardianForm = new FormGroup({
            firstName: new FormControl(guardian?.firstName),
            middleName: new FormControl(guardian?.middleName),
            lastName: new FormControl(guardian?.lastName),
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

        // guardian data
        const guardianCivilIdBackProcessData =
            this.customerReponse.documents.length > 0
                ? this.customerReponse.documents.find(
                    (x) => x.name === "GUARDIAN_NATIONAL_ID_BACK_SIDE"
                )
                : null;

        this.guardianCivilIdBackProcessed = guardianCivilIdBackProcessData
            ? JSON.parse(guardianCivilIdBackProcessData.processed_data)?.mrz
            : null;

        const guardianPassportProcessData =
            this.customerReponse.documents.length > 0
                ? this.customerReponse.documents.find(
                    (x) => x.name === "GUARDIAN_PASSPORT"
                )
                : null;
        this.guardianPassportProcessed = guardianPassportProcessData
            ? JSON.parse(guardianPassportProcessData.processed_data)?.mrz
            : null;


        this.customer = snakeToCamelObject(this.customerReponse);
        this.FATCA = data.find((x) => x.results.name === "FATCA");

        const bankingTransaction = data.filter((x) => x.results.name === "Banking Transactions");
        this.bankingTransaction = getRecentRecord(bankingTransaction, 'created_on');

        const kyc = data.filter((x) => x.results.name === "KYC");
        this.kycData = getRecentRecord(kyc, 'created_on');

        const crsTemplate = data.filter((x) => x.results.name === "CRS");
        const recent = getRecentRecord(crsTemplate, 'created_on');
        this.crsTemplate = recent ? recent.results : null;

        if (!this.crsTemplate) {
            this.getCRSTemplate();
        } else {
            this.validateIfCRSAllowed();
        }
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
        const _guardianNationalIdDocuments = [
            {
                title: "National Id Front",
                type: "GUARDIAN_NATIONAL_ID_FRONT_SIDE",
                isExtracted: false,
            },
            {
                title: "National Id Back",
                type: "GUARDIAN_NATIONAL_ID_BACK_SIDE",
                isExtracted: false,
            },
        ];

        const _passportDocuments = [
            { title: "Passport", type: "PASSPORT", isExtracted: false },
            { title: "Passport Face", type: "PASSPORT", isExtracted: true },
        ];

        const _guardianPassportDocuments = [
            { title: "Passport", type: "GUARDIAN_PASSPORT", isExtracted: false },
        ];

        this.screenshotsResponse.forEach(item => {
            const title = constantCaseToSentenceCase(item.attachment_type)
            this.screenShotsMapped.push({ id: item.id, title });
        });

        // Show additional document images in the tab
        this.mapAdditionalDocuments();
        //  CIVIL ID MAPPING
        this.nationalIdDocuments = _nationalIdDocuments.map((item) => {
            const url = this.previewDocumentUrl(item.type, item.isExtracted);
            return new ImageItem({ src: url, thumb: url, title: item.title });
        });

        // PASSPORT MAPPING
        this.passportDocuments = _passportDocuments.map((item) => {
            const url = this.previewDocumentUrl(item.type, item.isExtracted);
            return new ImageItem({ src: url, thumb: url, title: item.title });
        });
        // GUARDIAN CIVIL ID MAPPING
        this.guardianNationalIdDocuments = _guardianNationalIdDocuments.map((item) => {
            const url = this.previewDocumentUrl(item.type, item.isExtracted);
            return new ImageItem({ src: url, thumb: url, title: item.title });
        });

        // GUARDIAN PASSPORT MAPPING
        this.guardianPassportDocuments = _guardianPassportDocuments.map((item) => {
            const url = this.previewDocumentUrl(item.type, item.isExtracted);
            return new ImageItem({ src: url, thumb: url, title: item.title });
        });

        // SCREENSHOTS MAPPING
        this.screenShots = this.screenShotsMapped.map((item) => {
            const url = this.previewAttachmentsUrl(item.id);
            return new ImageItem({ src: url, thumb: url, title: item.title });
        });

        // ADDITIONAL DOCUMENTS MAPPING
        this.additionalDocuments = this.additionalDocsMapped.map((item) => {
            const url = this.previewAttachmentsUrl(item.id);
            return new ImageItem({ src: url, thumb: url, title: item.title });
        })

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
        this.withCustomGalleryConfig("additionalDocuments", this.additionalDocuments);

        this.withCustomGalleryConfig(
            "nationalIdDocuments",
            this.nationalIdDocuments
        );

        this.withCustomGalleryConfig(
            "guardianNationalIdDocuments",
            this.guardianNationalIdDocuments
        );

        this.withCustomGalleryConfig(
            "guardianPassportDocuments",
            this.guardianPassportDocuments
        );
    }

    getFullName() {
        if (!this.customer?.firstName && !this.customer?.middleName && !this.customer?.lastName) {
            return null;
        }

        return `${this.customer.firstName ? this.customer.firstName : ''} ${this.customer.middleName ? this.customer.middleName : ''}  ${this.customer.lastName ? this.customer.lastName : ''} `
    }
    getGuardianFullName() {
        const guardian: any = this.customer?.guardians && this.customer?.guardians[0] ? snakeToCamelObject(this.customer?.guardians[0]) : null;

        if (!guardian?.firstName && !guardian?.middleName && !guardian?.lastName) {
            return null;
        }

        return `${guardian?.firstName ? guardian?.firstName : ''} ${guardian?.middleName ? guardian?.middleName : ''}  ${guardian?.lastName ? guardian?.lastName : ''} `
    }
    validateIfCRSAllowed() {
        const allowed = this.checkFatcaForAnswers(this.FATCA);
        if (!allowed) {
            this.crsTemplate = null;
        } else {
            this.crsTemplate = this.sortTemplate(this.crsTemplate)
        }
    }

    sortTemplate(template) {
        let sections = template?.sections;
        if (!sections) return null;
        sections = sections.sort((a, b) => a.level.localeCompare(b.level));
        template.sections = sections;
        return template;
    }

    findScreenShotType(title, type) {
        const data = this.screenshotsResponse.find(
            (x) => x.attachment_type == type
        );
        if (data) {
            this.screenShotsMapped.push({ id: data.id, title });
        }
    }

    mapAdditionalDocuments() {
        this.additionalDocsResponse?.forEach(doc => {
            const docTitle: string = constantCaseToSentenceCase(doc.attachment_type);
            const docId: string = doc.id;
            this.additionalDocsMapped.push({ id: docId, title: docTitle });
        });
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
    previewAttachmentsUrl(attachmentId) {
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
                this.createAccount(response);
                return;
            } else {
                this.updatedResponse = response;
                this._notifier.success('Remarks added successfully')
            }
        },
            (response) => super.onError(response))
    }
    createAccount(customerDetails) {
        this.customerService.createAccount(this.customer.id)
            .subscribe((response) => {
                this.updatedResponse = customerDetails;
                this._notifier.success('Account created successfully')
            }, (response) => super.onError(response))
    }
    getCRSTemplate() {
        this.customerService.getCRSTemplate()
            .subscribe((response) => {
                this.crsTemplate = response;
                this.validateIfCRSAllowed();
            }, (response) => super.onError(response))
    }

    checkFatcaForAnswers = (fatcaResp) => {
        let shouldAllow = false;
        fatcaResp?.results?.sections.forEach(section => {
            section?.questions.forEach(ques => {
                if (ques["answer"] == "Yes" || ques["answer"] == "yes") {
                    shouldAllow = true;
                }
            });
        });

        if (!fatcaResp) {
            shouldAllow = false;
        }
        return shouldAllow;
    }

    getAMLData() {
        this.customerService.getAMLData(this.customer.id)
            .subscribe((response) => {
                if (response.responses) {
                    const parsedResponse = getRecentRecord(response.responses, 'created_on');
                    parsedResponse['response_text'] = JSON.parse(parsedResponse['response_text']);

                    if (parsedResponse['response_text'].error || parsedResponse['response_text'].status === 400) {
                        this._notifier.error(MESSAGES.UNKNOWN);
                        return;
                    }
                    this.amlResponse = parsedResponse;
                    this._notifier.success('AML data fetched successfully.');
                }

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
    onResetGuardianEditControl(control) {
        this.guardianForm.patchValue({ [control]: this.customerReponse.guardians[0][camelToSnakeCaseText(control)] })
    }

    updateCustomer(field) {
        const newValue = this.customerForm.get(field).value;
        const oldValue = this.customerReponse[camelToSnakeCaseText(field)]
        if (newValue == oldValue || newValue.length < 1) return;

        this.customerService.updateCustomer(this.customer.id, { [camelToSnakeCaseText(field)]: this.customerForm.get(field).value })
            .subscribe((response) => {
                this.updatedResponse = response;
                this.customer[field] = response[camelToSnakeCaseText(field)]
                this._notifier.success(`${camelToSentenceCase(field)} updated successfully`);

            }, (response) => super.onError(response))
    }
    updateGuardian(field) {

        const newValue = this.guardianForm.get(field).value;
        const guardian: any = this.customer?.guardians && this.customer?.guardians[0] ? this.customer?.guardians[0] : null;
        const oldValue = guardian[camelToSnakeCaseText(field)]
        if (newValue == oldValue || newValue.length < 1) return;

        this.customerService.updateGuardian(this.customer.id, { [camelToSnakeCaseText(field)]: this.guardianForm.get(field).value })
            .subscribe((response) => {
                this.updatedResponse = response;
                this.customer.guardians[0][field] = response[camelToSnakeCaseText(field)]
                this._notifier.success(`${camelToSentenceCase(field)} updated successfully`);

            }, (response) => super.onError(response))
    }

    updateRemarksOptionsForStatus(status: string) {

        if (status == CUSTOMER_STATUSES.PENDING) {
            this.customerReponse.status = null;
            this.remarksList = REMARKS_LIST;
        }
        else if (status == CUSTOMER_STATUSES.DROPPED) {
            this.remarksList = REMARKS_LIST;
        }
        else if (status == CUSTOMER_STATUSES.REFER_TO_BUSINESS) {
            this.customerReponse.status = null;
            this.remarksList = REMARKS_LIST.filter(x => [CUSTOMER_STATUSES.ACCEPTED, CUSTOMER_STATUSES.REJECTED].includes(x.id));
        }
        else {
            this.remarksList = REMARKS_LIST.filter(x => x.id == status);
        }
    }
}
