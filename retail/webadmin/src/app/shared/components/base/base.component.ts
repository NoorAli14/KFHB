import { AppInjector } from './../../app.injector';
import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "@core/services/user/auth-user.service";
import { MESSAGES } from '@shared/constants/app.constants';
import { ErrorEmitterService } from '@core/services/error-emitter/error-emitter.service';

@Component({
    selector: "app-base",
    templateUrl: "./base.component.html",
    styles: [],
})
export class BaseComponent implements OnInit {
    userPermissions: any[];
    responseMessage: string = "";
    errorType: string = "";
    protected _authUserService: AuthUserService;
    protected   _errorEmitService:ErrorEmitterService;
    constructor(
        private moduleType?: String
    ) {
        this._authUserService= AppInjector.injector.get(AuthUserService)
        this._errorEmitService= AppInjector.injector.get(ErrorEmitterService)
    }

    ngOnInit(): void {
        this.userPermissions = this._authUserService.getPermissionsByModule(
            this.moduleType
          );
    }
    onError(response){
        this.errorType = "error";
        this.responseMessage = MESSAGES.UNKNOWN;
    }
}
