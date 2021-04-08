import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternationalTransferRequestsComponent } from './views/international-transfer-requests/international-transfer-requests.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '', component: InternationalTransferRequestsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternationalTransferRequestsRoutingModule { }
