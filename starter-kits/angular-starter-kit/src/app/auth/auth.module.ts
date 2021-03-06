import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./views/login/login.component";
import { FuseSharedModule } from "@fuse/shared.module";
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { MaterialFormsModule } from '@shared/modules/material-forms/material-forms.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [LoginComponent,  ForgotPasswordComponent, ResetPasswordComponent],
    imports: [
        CommonModule,
        MaterialFormsModule,
        FuseSharedModule,
        AuthRoutingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

    ],
})
export class AuthModule {}
