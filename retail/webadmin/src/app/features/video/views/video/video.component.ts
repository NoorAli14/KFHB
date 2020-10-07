import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { fuseAnimations } from "@fuse/animations";
import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { environment } from "@env/environment";

@Component({
    selector: "app-video",
    templateUrl: "./video.component.html",
    styleUrls: ["./video.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit {
    url: any;
    constructor(
        private sanitizer: DomSanitizer,
        private authService: AuthenticationService
    ) {}

    ngOnInit(): void {
        this.loadIframe();
    }

    loadIframe(): void {
        const token = this.authService.accessToken;
        const channelId = environment.CHANNEL_ID;
        const tenantId = environment.TENANT_ID;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${environment.VIDEO_URL}/login?token=${token}&channelid=${channelId}&tenantid=${tenantId}`
        );
    }
}
