import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { PhoneVerificationComponent } from './views/phone-verification/phone-verification.component';
import { InvitationComponent } from './views/invitation/invitation.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'verification',
        component: PhoneVerificationComponent,
    },

    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'verification',
        component: PhoneVerificationComponent,
    },
    {
        path: 'invitation/:token',
        component: InvitationComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
