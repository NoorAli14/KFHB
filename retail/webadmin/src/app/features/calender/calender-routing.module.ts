import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo:'working-week', pathMatch:'full'
      },
    {
        path: "working-days",
        loadChildren: () =>
            import("./working-day/working-day.module").then((m) => m.WorkingDayModule),
    },
    {
        path: "holidays",
        loadChildren: () =>
            import("./holiday/holiday.module").then((m) => m.HolidayModule),
    },
    {
        path: "leave",
        loadChildren: () =>
            import("./leave/leave.module").then((m) => m.LeaveModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CalenderRoutingModule {}
