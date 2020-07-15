import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./views/login/login.component";
import { FuseSharedModule } from "@fuse/shared.module";
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { MaterialFormsModule } from '@shared/modules/material-forms/material-forms.module';
import { PhoneVerificationComponent } from './views/phone-verification/phone-verification.component';

@NgModule({
    declarations: [LoginComponent,  ForgotPasswordComponent,
         ResetPasswordComponent,  PhoneVerificationComponent],
    imports: [
        CommonModule,
        MaterialFormsModule,
        FuseSharedModule,
        AuthRoutingModule
    ],
})
export class AuthModule {}
