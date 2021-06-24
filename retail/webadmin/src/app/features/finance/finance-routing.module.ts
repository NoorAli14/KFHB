import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceComponent } from './views/finance/finance.component';


const routes: Routes = [
  {
      path: '',
      component: FinanceComponent
      
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
