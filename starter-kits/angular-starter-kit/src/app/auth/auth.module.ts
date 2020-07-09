import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { FuseSharedModule } from "@fuse/shared.module";
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { MaterialFormsModule } from '@shared/modules/material-forms/material-forms.module';

@NgModule({
    declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialFormsModule,
        FuseSharedModule,
    ],
})
export class AuthModule {}
