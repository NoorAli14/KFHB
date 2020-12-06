import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@shared/services/auth/authentication.service';
import { environment } from '@env/environment';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit, OnDestroy {
    url: any;
    constructor(
        private sanitizer: DomSanitizer,
        private authService: AuthenticationService,
        private _fuseSidebarService: FuseSidebarService,
    ) {}

    ngOnInit(): void {
        this.loadIframe();
        // this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }

    loadIframe(): void {
        const token = this.authService.accessToken;
        const channelId = environment.CHANNEL_ID;
        const tenantId = environment.TENANT_ID;
        
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://rubix-dev01.conduit-aiondigital.com:8443/login?token=${token}&channelid=${channelId}&tenantid=${tenantId}`
        );
    }
    ngOnDestroy(): void{
        // this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }
}
