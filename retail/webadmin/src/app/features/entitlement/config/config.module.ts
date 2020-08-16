import { MatTreeModule } from '@angular/material/tree';
import { CdkTreeModule } from '@angular/cdk/tree';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './views/config/config.component';
import { SharedModule } from '@shared/shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { FuseSidebarModule } from '@fuse/components/sidebar/sidebar.module';
import { ConfigSidebarComponent } from './components/config-sidebar/config-sidebar.component';
import { AccessControlComponent } from './views/access-control/access-control.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { RoleComponent } from './views/role/role.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { ModulesComponent } from './views/modules/modules.component';
import { ModulesFormComponent } from './components/modules-form/modules-form.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [ConfigComponent ,ModulesComponent,ModulesFormComponent, RoleComponent, RoleFormComponent,TableRowComponent,   ConfigSidebarComponent,   AccessControlComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    SharedModule,
    FuseSidebarModule,
    FuseSharedModule,
    MaterialModule,
    MatTreeModule,
    CdkTreeModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  entryComponents:[RoleFormComponent]
})
export class ConfigModule { }
