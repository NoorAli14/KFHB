import { HolidayComponent } from './views/holiday/holiday.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WorkingDayComponent } from "./views/working-day/working-day.component";
import { CalendarService } from './calendar.service';

const routes: Routes = [
    {
        path: "",
        redirectTo: "working-days",
    },
    {
        path: "working-days",
        component: WorkingDayComponent,
    },
    {
        path: "holidays",
        component: HolidayComponent,
        resolve  : {
          chat: CalendarService
      }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CalenderRoutingModule {}
