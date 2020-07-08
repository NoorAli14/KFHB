import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";
import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { AppRoutingModule } from "./app-routing.module";
import {
    InMemoryWebApiModule,
} from "angular-in-memory-web-api";
import { FakeDbService } from "./fake-db/fake-db.service";
import { CoreModule } from "@core/core.module";
import { environment } from "@env/environment";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        TranslateModule.forRoot(),
        environment.isMockEnabled
            ? InMemoryWebApiModule.forRoot(FakeDbService, {
                  passThruUnknownUrl: true,
                  dataEncapsulation: false,
                  delay:500
              })
            : [],
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        CoreModule,
        // App modules
        LayoutModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
