import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationDetailComponent } from './views/application-detail/application-detail.component';
import { FinanceComponent } from './views/finance/finance.component';


const routes: Routes = [
  {
      path: '',
      component: FinanceComponent
      
  },
  {
      path: ':id',
      component: ApplicationDetailComponent
      
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
