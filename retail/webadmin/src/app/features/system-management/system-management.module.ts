import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemManagementRoutingModule } from './system-management-routing.module';
import { LogsComponent } from './views/logs/logs.component';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialFormsModule } from '@shared/modules/material-forms/material-forms.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    SystemManagementRoutingModule,
    SharedModule,
    FuseSidebarModule,
    FuseSharedModule,
    MaterialFormsModule,
    MaterialModule,
  ]
})
export class SystemManagementModule { }
