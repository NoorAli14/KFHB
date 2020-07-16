import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "user",
        loadChildren: () =>
            import("./user/user.module").then((m) => m.UserModule),
    },
    {
        path: "role",
        loadChildren: () =>
            import("./role/role.module").then((m) => m.RoleModule),
    },
    {
        path: "error",
        loadChildren: () =>
            import("./error/error.module").then((m) => m.ErrorModule),
    },
    {
        path: "setting",
        loadChildren: () =>
            import("./setting/setting.module").then((m) => m.SettingModule),
    },
    {
        path: "**",
        redirectTo: "error",
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
