import { RoleComponent } from './views/role/role.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RoleRoutingModule } from "./role-routing.module";
import { SharedModule } from "@shared/shared.module";
import { FuseSidebarModule } from "@fuse/components";
import { PermissionComponent } from './components/permission/permission.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { PermissionFormComponent } from './components/permission-form/permission-form.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


@NgModule({
    declarations: [
        PermissionComponent,
        PermissionFormComponent,
        RoleComponent,
        RoleFormComponent,
        TableRowComponent,
    ],
    imports: [
        RoleRoutingModule,
        CommonModule,
        SharedModule,
        FuseSidebarModule,
        FuseSharedModule,
        MaterialModule,
    ],
    providers: [
      { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ],
    entryComponents:[RoleFormComponent]
})
export class RoleModule {}
