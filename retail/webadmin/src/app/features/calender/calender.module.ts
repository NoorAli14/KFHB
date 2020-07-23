import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalenderRoutingModule } from './calender-routing.module';
import { WorkingDayComponent } from './views/working-day/working-day.component';
import { HolidayComponent } from './views/holiday/holiday.component';
import { WorkingDayFormComponent } from './components/working-day-form/working-day-form.component';
import { SharedModule } from '@shared/shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [WorkingDayComponent, HolidayComponent, WorkingDayFormComponent],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule,
    AngularCalendarModule.forRoot({
      provide   : DateAdapter,
      useFactory: adapterFactory
  }),
  ]
})
export class CalenderModule { }
