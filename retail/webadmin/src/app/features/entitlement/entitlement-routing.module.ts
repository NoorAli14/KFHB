import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "user",
        loadChildren: () =>
            import("./user/user.module").then((m) => m.UserModule),
    },
    // {
    //     path: "config",
    //     loadChildren: () =>
    //         import("./config/config.module").then((m) => m.ConfigModule),
    // },
    {
        path: "role",
        loadChildren: () =>
            import("./role/role.module").then((m) => m.RoleModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EntitlementRoutingModule {}
