import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingRoutingModule } from "./setting-routing.module";
import { ProfileComponent } from "./views/profile/profile.component";
import { MaterialFormsModule } from "@shared/modules/material-forms/material-forms.module";
import { FuseSharedModule } from '@fuse/shared.module';
import { AboutComponent } from './components/about/about.component';

@NgModule({
    declarations: [ProfileComponent, AboutComponent],
    imports: [
        CommonModule,
        SettingRoutingModule,
        MaterialFormsModule,
        FuseSharedModule,
    ],
})
export class SettingModule {}
