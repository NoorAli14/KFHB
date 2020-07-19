import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './views/config/config.component';
import { RoleModuleFormComponent } from './components/role-module-form/role-module-form.component';
import { ManagePermissionFormComponent } from './components/manage-permission-form/manage-permission-form.component';
import { SharedModule } from '@shared/shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { FuseSidebarModule } from '@fuse/components/sidebar/sidebar.module';
import { ConfigSidebarComponent } from './components/config-sidebar/config-sidebar.component';
import { RoleModuleComponent } from './views/role-module/role-module.component';

@NgModule({
  declarations: [ConfigComponent, RoleModuleFormComponent, ManagePermissionFormComponent, ConfigSidebarComponent, RoleModuleComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    SharedModule,
    FuseSidebarModule,
    FuseSharedModule,
    MaterialModule,
  ]
})
export class ConfigModule { }
