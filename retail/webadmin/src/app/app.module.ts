import { NgModule, Injector, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";
import { CoreModule } from "@core/core.module";
import { fuseConfig } from "app/fuse-config";
import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { AppRoutingModule } from "./app-routing.module";
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { ngxUiLoaderConfig } from "@config/index";
import { EventBusService } from "@core/services/event-bus/event-bus.service";
import { AuthUserService } from "@core/services/user/auth-user.service";
import { AppInjector } from "@shared/app.injector";
import { TreeviewModule } from "ngx-treeview";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "@core/services/auth-interceptor/auth-interceptor.service";
import { ErrorInterceptorService } from "@core/services/error-interceptor/error-interceptor.service";
import { GlobalErrorService } from "@core/services/global-error/global-error.service";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,
        NgxUiLoaderHttpModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        HttpClientModule,
        FuseThemeOptionsModule,
        TreeviewModule.forRoot(),
        // App modules
        LayoutModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorService,
            multi: true,
        },
        { provide: ErrorHandler, useClass: GlobalErrorService },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(injector: Injector) {
        AppInjector.injector = injector;
    }
}
