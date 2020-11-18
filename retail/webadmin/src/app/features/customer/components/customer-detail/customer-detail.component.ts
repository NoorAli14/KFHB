import { DEFAULT_IMAGE } from "./../../../../shared/constants/app.constants";
import { snakeToCamelObject } from "@shared/helpers/global.helper";
import {
    AfterContentChecked,
    Component,
    Inject,
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
@Component({
    selector: "app-customer-detail",
    templateUrl: "./customer-detail.component.html",
    styleUrls: ["./customer-detail.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class CustomerDetailComponent implements OnInit, AfterContentChecked {
    nationalIdDocuments: GalleryItem[];
    passportDocuments: GalleryItem[];
    screenShots: GalleryItem[];
    FATCA: any;
    amlData: any;
    bankingTransaction: any;
    passportProcessed: any;
    civilIdBackProcessed: any;
    customer: any;
    customerReponse: any;
    screenShotsResponse: any;
    screenShotsMapped = [];
    constructor(
        public gallery: Gallery,
        public matDialogRef: MatDialogRef<CustomerDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private authService: AuthenticationService
    ) {}

    ngOnInit(): void {
        this.customerReponse = this.data[0];
        this.screenShotsResponse = this.data[1];
        this.initData();
    }
    initData(): void {
        let data = this.customerReponse.templates?.map((item) => {
            return { ...item, results: JSON.parse(atob(item.results)) };
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
        this.bankingTransaction = data.find((x) => x.results.name === "KYC");

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
        return `${environment.API_BASE_URL}/api/v1${url}`;
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

        let url = `/onboarding/customers/${customerId}/attachments/${document.id}/preview?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}`;
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
}
