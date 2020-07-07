import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "login",
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "register",
        component: RegisterComponent,
    },
    {
        path: "reset-password",
        component: ResetPasswordComponent,
    },
    {
        path: "forgot-password",
        component: ForgotPasswordComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
