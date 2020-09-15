import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingDayRoutingModule } from './working-day-routing.module';
import { WorkingDayComponent } from './views/working-day/working-day.component';
import { WorkingDayFormComponent } from './components/working-day-form/working-day-form.component';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [WorkingDayComponent, WorkingDayFormComponent],
  imports: [
    CommonModule,
    WorkingDayRoutingModule,
    SharedModule,
    FuseSidebarModule,
    FuseSharedModule,
    MaterialModule,
  ]
})
export class WorkingDayModule { }
