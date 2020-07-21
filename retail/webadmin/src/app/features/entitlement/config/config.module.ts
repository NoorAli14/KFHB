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
import { AccessControlComponent } from './views/access-control/access-control.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { PermissionComponent } from './components/permission/permission.component';
import { RoleComponent } from './views/role/role.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { ModulesComponent } from './views/modules/modules.component';
import { ModulesFormComponent } from './components/modules-form/modules-form.component';

@NgModule({
  declarations: [ConfigComponent ,ModulesComponent,ModulesFormComponent, RoleComponent, RoleFormComponent,TableRowComponent, RoleModuleFormComponent, ManagePermissionFormComponent, ConfigSidebarComponent, RoleModuleComponent, PermissionComponent, AccessControlComponent],
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
