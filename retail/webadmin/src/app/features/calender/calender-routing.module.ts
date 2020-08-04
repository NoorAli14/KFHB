import { HolidayComponent } from './views/holiday/holiday.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WorkingDayComponent } from "./views/working-day/working-day.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "working-days",
    },
    {
        path: "working-days",
        component: WorkingDayComponent
    },
    {
        path: "holidays",
        component: HolidayComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CalenderRoutingModule {}
