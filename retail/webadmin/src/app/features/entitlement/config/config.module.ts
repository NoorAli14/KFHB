import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './views/config/config.component';
import { RoleModuleFormComponent } from './components/role-module-form/role-module-form.component';
import { ManagePermissionFormComponent } from './components/manage-permission-form/manage-permission-form.component';
import { SharedModule } from '@shared/shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';


@NgModule({
  declarations: [ConfigComponent, RoleModuleFormComponent, ManagePermissionFormComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule,
  ]
})
export class ConfigModule { }
