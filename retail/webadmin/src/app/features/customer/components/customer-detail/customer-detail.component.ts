import { DEFAULT_IMAGE } from './../../../../shared/constants/app.constants';
import { snakeToCamelObject } from "@shared/helpers/global.helper";
import { AfterContentChecked, Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
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
    FATCA: any;
    bankingTransaction: any;
    passportProcessed: any;
    civilIdBackProcessed: any;
    customer: any;
    constructor(
        public gallery: Gallery,
        public matDialogRef: MatDialogRef<CustomerDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private authService: AuthenticationService
    ) {}

    ngOnInit(): void {
       this.initData();
    }
    initData(){
        const data = this.data.templates.map((item) => {
            return { ...item, results: JSON.parse(atob(item.results)) };
        });
        const civilIdBackProcessData =
            this.data.documents.length > 0
                ? this.data.documents.find(
                      (x) => x.name === "NATIONAL_ID_BACK_SIDE"
                  )
                : null;
        this.civilIdBackProcessed = civilIdBackProcessData
            ? JSON.parse(civilIdBackProcessData.processed_data)?.mrz
            : null;
        const passportProcessData =
            this.data.documents.length > 0
                ? this.data.documents.find((x) => x.name === "PASSPORT")
                : null;
        this.passportProcessed = passportProcessData
            ? JSON.parse(passportProcessData.processed_data)?.mrz
            : null;
        this.customer = snakeToCamelObject(this.data);
        this.FATCA = data.find((x) => x.results.name === "FATCA");
        this.bankingTransaction = data.find((x) => x.results.name === "KYC");

        const _nationalIdDocuments = [
            { type: "NATIONAL_ID_BACK_SIDE", isExtracted: false },
            { type: "NATIONAL_ID_FRONT_SIDE", isExtracted: false },
            { type: "NATIONAL_ID_FRONT_SIDE", isExtracted: true },
        ];

        const _passportDocuments = [
            { type: "PASSPORT", isExtracted: false },
            { type: "PASSPORT", isExtracted: true },
        ];

        this.nationalIdDocuments = _nationalIdDocuments.map((item) => {
            const url = this.previewDocumentUrl(item.type, item.isExtracted);
            return new ImageItem({ src: url, thumb: url });
        });
        this.passportDocuments = _passportDocuments.map((item) => {
            const url = this.previewDocumentUrl(item.type, item.isExtracted);
            return new ImageItem({ src: url, thumb: url });
        });

        this.basicLightboxExample(this.passportDocuments);
        this.basicLightboxExample(this.nationalIdDocuments);

        // Load item into different lightbox instance
        // With custom gallery config
        this.withCustomGalleryConfig(
            "passportDocuments",
            this.passportDocuments
        );
        this.withCustomGalleryConfig(
            "nationalIdDocuments",
            this.nationalIdDocuments
        );
    }
    ngAfterContentChecked(): void {
        const el = document.querySelectorAll(".g-image-item");
        el.forEach((x) => {
            x["style"].backgroundSize = "contain";
        });
    }
    basicLightboxExample(items) {
        this.gallery.ref().load(items);
    }

    getUrl(url) {
        return `${environment.API_BASE_URL}/api/v1${url}`;
    }

    previewDocumentUrl(type, isExtracted) {
        const tenantId = environment.TENANT_ID;
        const channelId = environment.CHANNEL_ID;
        const token = this.authService.accessToken;
        const customerId = this.data.id;

        const document = this.data.documents.find((x) => x.name === type);
        if (!document) return DEFAULT_IMAGE;

        let url = `/entitlements/customers/${customerId}/documents/${document.id}/preview?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}`;
        if (isExtracted) {
            url = `${url}&extracted-image=true`;
        }
        return this.getUrl(url);
    }
    withCustomGalleryConfig(element, images) {
        const lightboxGalleryRef = this.gallery.ref(element);

        lightboxGalleryRef.setConfig({
            imageSize: ImageSize.Cover,
            thumbPosition: ThumbnailsPosition.Top,
        });

        lightboxGalleryRef.load(images);
    }
}
