import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: 'ent',
    loadChildren: () => import('./entitlement/entitlement.module').then(m => m.EntitlementModule)
  },
  {
    path: 'calender',
    loadChildren: () => import('./calender/calender.module').then(m => m.CalenderModule)
  },
  {
     path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '**', redirectTo:'error'
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
