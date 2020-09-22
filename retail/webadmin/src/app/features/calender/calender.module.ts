import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalenderRoutingModule } from './calender-routing.module';
import { WorkingDayComponent } from './views/working-day/working-day.component';
import { HolidayComponent } from './views/holiday/holiday.component';
import { WorkingDayFormComponent } from './components/working-day-form/working-day-form.component';
import { SharedModule } from '@shared/shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { HolidayFormComponent } from './components/holiday-form/holiday-form.component';

@NgModule({
  declarations: [WorkingDayComponent, HolidayComponent, WorkingDayFormComponent, HolidayFormComponent],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule,
  ],
  entryComponents: [
    WorkingDayFormComponent
],
})
export class CalenderModule { }
