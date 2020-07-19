import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionComponent } from './views/permission/permission.component';
import { PermissionFormComponent } from './views/permission-form/permission-form.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';


@NgModule({
  declarations: [PermissionComponent, PermissionFormComponent],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule
  ]
})
export class PermissionModule { }
