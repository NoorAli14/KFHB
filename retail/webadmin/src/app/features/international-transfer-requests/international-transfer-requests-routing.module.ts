import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternationalTransferReportComponent } from './views/international-transfer-report/international-transfer-report.component';
import { InternationalTransferRequestsComponent } from './views/international-transfer-requests/international-transfer-requests.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '', component: InternationalTransferRequestsComponent
  },
  {
    path: 'report/:id', component: InternationalTransferReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternationalTransferRequestsRoutingModule { }
