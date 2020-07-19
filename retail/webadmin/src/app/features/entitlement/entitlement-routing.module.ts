import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'role',
    loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
  },
  {
    path: 'permission',
    loadChildren: () => import('./permission/permission.module').then(m => m.PermissionModule)
  },
  {
    path: 'modules',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitlementRoutingModule { }
