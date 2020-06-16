// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './shared/theme/base/base.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)},
  {path: '', loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)},
  {path: '**', redirectTo: 'error/404', pathMatch: 'full'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
