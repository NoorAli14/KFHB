import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferralsComponent } from './views/referrals.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '', component: ReferralsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferralsRoutingModule { }
