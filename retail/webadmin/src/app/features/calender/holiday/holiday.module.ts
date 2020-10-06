import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidayRoutingModule } from './holiday-routing.module';
import { HolidayFormComponent } from './components/holiday-form/holiday-form.component';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { SharedModule } from '@shared/shared.module';
import { HolidayComponent } from './views/holiday.component';


@NgModule({
  declarations: [HolidayFormComponent, HolidayComponent],
  imports: [
    CommonModule,
    HolidayRoutingModule,
    SharedModule,
    FuseSidebarModule,
    FuseSharedModule,
    MaterialModule,
  ]
})
export class HolidayModule { }
