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
        import('./views/requests-list/requests-list.module').then((m) => m.RequestsListModule),
},
{
  path: 'details/:id',
  loadChildren: () =>
      import('./views/request-details/request-details.module').then((m) => m.RequestDetailsModule),
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRequestRoutingModule { }
