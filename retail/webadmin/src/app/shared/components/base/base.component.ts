import { AppInjector } from './../../app.injector';
import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "@core/services/user/auth-user.service";

@Component({
    selector: "app-base",
    templateUrl: "./base.component.html",
    styles: [],
})
export class BaseComponent implements OnInit {
    userPermissions: any[];
    protected _authUserService: AuthUserService;
    constructor(
        private moduleType: String
    ) {
        this._authUserService= AppInjector.injector.get(AuthUserService)
    }

    ngOnInit(): void {
        this.userPermissions = this._authUserService.getPermissionsByModule(
            this.moduleType
          );
    }
}
