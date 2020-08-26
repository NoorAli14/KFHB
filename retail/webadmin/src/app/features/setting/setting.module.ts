import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingRoutingModule } from "./setting-routing.module";
import { ProfileComponent } from "./views/profile/profile.component";
import { MaterialFormsModule } from "@shared/modules/material-forms/material-forms.module";
import { FuseSharedModule } from '@fuse/shared.module';
import { AboutComponent } from './components/about/about.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { SharedModule } from '@shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

@NgModule({
    declarations: [ProfileComponent, AboutComponent, UpdateProfileComponent, UpdatePasswordComponent],
    imports: [
        CommonModule,
        SettingRoutingModule,
        MatTabsModule,
        MaterialFormsModule,
        SharedModule,
        FuseSharedModule,
    ],
})
export class SettingModule {}
