import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveComponent } from './views/leave/leave.component';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { SharedModule } from '@shared/shared.module';
import { LeaveFormComponent } from './components/leave-form/leave-form.component';


@NgModule({
  declarations: [LeaveComponent, LeaveFormComponent],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    SharedModule,
    FuseSidebarModule,
    FuseSharedModule,
    MaterialModule,
  ]
})
export class LeaveModule { }
