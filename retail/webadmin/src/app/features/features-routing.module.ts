import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ent', pathMatch: 'full'
  },
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
    path: 'video',
    loadChildren: () => import('./video/video.module').then(m => m.VideoModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'system',
    loadChildren: () => import('./system-management/system-management.module').then(m => m.SystemManagementModule)
  },
  {
    path: 'referrals',
    loadChildren: () => import('./referrals/referrals.module').then(m => m.ReferralsModule)
  },
  {
    path: 'req',
    loadChildren: () => import('./service-requests/service-requests.module').then(m => m.ServiceRequestModule)
  },
  {
    path: 'international-transfer-requests',
    loadChildren: () => import('./international-transfer-requests/international-transfer-requests.module').then(m => m.InternationalTransferRequestsModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule)
  },
  {
    path: '**', redirectTo: 'error'
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
