import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list', pathMatch: ''
  },
  {
    path: 'list',
    loadChildren: () =>
        import('./views/requests-list/request-list.module').then((m) => m.RequestListModule),
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRequestRoutingModule { }
