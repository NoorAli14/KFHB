import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkingDayComponent } from './views/working-day/working-day.component';


const routes: Routes = [
  {
      path: '',
      component: WorkingDayComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingDayRoutingModule { }
