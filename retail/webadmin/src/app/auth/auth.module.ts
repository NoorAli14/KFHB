import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./views/login/login.component";
import { FuseSharedModule } from "@fuse/shared.module";
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { MaterialFormsModule } from '@shared/modules/material-forms/material-forms.module';

import { PhoneVerificationComponent } from './views/phone-verification/phone-verification.component';
import { SharedModule } from '@shared/shared.module';
import { InvitationComponent } from './views/invitation/invitation.component';
@NgModule({
    declarations: [LoginComponent,  ForgotPasswordComponent, ResetPasswordComponent, PhoneVerificationComponent, InvitationComponent],
    imports: [
        CommonModule,
        MaterialFormsModule,
        FuseSharedModule,
        SharedModule,
        AuthRoutingModule
    ],
})
export class AuthModule {}
