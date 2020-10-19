import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
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
export class CustomerDetailComponent implements OnInit {
    items: GalleryItem[];
    imagesUrl: Array<any> = [];
    constructor(
        public gallery: Gallery,
        public matDialogRef: MatDialogRef<CustomerDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private authService: AuthenticationService
    ) {}

    ngOnInit(): void {
        debugger;
        this.imagesUrl=data;
        return; 
        const _documents = [
            { type: "PASSPORT", isExtracted: false },
            { type: "PASSPORT", isExtracted: true },
            { type: "NATIONAL_ID_BACK_SIDE", isExtracted: false },
            { type: "NATIONAL_ID_FRONT_SIDE", isExtracted: false },
            { type: "NATIONAL_ID_FRONT_SIDE", isExtracted: true },
        ];

        this.items = _documents.map((item) => {
            const url = this.previewDocumentUrl(item.type, item.isExtracted);
            return new ImageItem({ src: url, thumb: url });
        });
        this.basicLightboxExample();

        // Load item into different lightbox instance
        // With custom gallery config
        this.withCustomGalleryConfig();
    }
    basicLightboxExample() {
        this.gallery.ref().load(this.items);
    }

    getUrl(url) {
        return `${environment.API_BASE_URL}${url}`;
    }

    previewDocumentUrl(type, isExtracted) {
        const tenantId = environment.TENANT_ID;
        const channelId = environment.CHANNEL_ID;
        const token = this.authService.accessToken;
        const customerId = this.data.id;

        const document = this.data.documents.find((x) => x.name === type);
        if (!document) return "";
        let url = `/entitlements/customers/${customerId}/documents/${document.id}/preview?x-access-token=${token}&x-tenant-id=${tenantId}&x-channel-id=${channelId}`;
        if (isExtracted) {
            url = `${url}&extracted-image=true`;
        }
        return this.getUrl(url);
    }
    withCustomGalleryConfig() {
        // 2. Get a lightbox gallery ref
        const lightboxGalleryRef = this.gallery.ref("documents");

        // (Optional) Set custom gallery config to this lightbox
        lightboxGalleryRef.setConfig({
            imageSize: ImageSize.Cover,
            thumbPosition: ThumbnailsPosition.Top,
        });

        // 3. Load the items into the lightbox
        lightboxGalleryRef.load(this.items);
    }
}

const data = [
    {
        srcUrl: "https://preview.ibb.co/jrsA6R/img12.jpg",
        previewUrl: "https://preview.ibb.co/jrsA6R/img12.jpg",
    },
    {
        srcUrl: "https://preview.ibb.co/kPE1D6/clouds.jpg",
        previewUrl: "https://preview.ibb.co/kPE1D6/clouds.jpg",
    },
    {
        srcUrl: "https://preview.ibb.co/mwsA6R/img7.jpg",
        previewUrl: "https://preview.ibb.co/mwsA6R/img7.jpg",
    },
    {
        srcUrl: "https://preview.ibb.co/kZGsLm/img8.jpg",
        previewUrl: "https://preview.ibb.co/kZGsLm/img8.jpg",
    },
];
