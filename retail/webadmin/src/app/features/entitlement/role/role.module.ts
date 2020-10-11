import { RoleComponent } from './views/role/role.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { PermissionComponent } from './components/permission/permission.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
    declarations: [
        PermissionComponent,
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
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule
    ],
    
    providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
],
    entryComponents: [RoleFormComponent]
})
export class RoleModule { }
