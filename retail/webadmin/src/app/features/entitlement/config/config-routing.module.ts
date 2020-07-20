import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConfigComponent } from "./views/config/config.component";
import { RoleModuleComponent } from "./views/role-module/role-module.component";
import { AccessControlComponent } from "./views/access-control/access-control.component";

const routes: Routes = [
    {
        path: "",
        component: ConfigComponent,
        children: [
            {
                path: "",
                redirectTo: "role-module",
            },
            {
                path: "role-module",
                component: RoleModuleComponent,
            },
         
            {
                path: "access-control",
                component: AccessControlComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConfigRoutingModule {}
