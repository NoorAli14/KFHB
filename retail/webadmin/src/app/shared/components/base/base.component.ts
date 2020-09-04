import { AppInjector } from './../../app.injector';
import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "@shared/services/user/auth-user.service";
import { MESSAGES } from '@shared/constants/app.constants';
import { ErrorEmitterService } from '@shared/services/error-emitter/error-emitter.service';
import { MapperService } from '@shared/services/mapper.service';

@Component({
    selector: "app-base",
    templateUrl: "./base.component.html",
    styles: [],
})
export class BaseComponent implements OnInit {
    userPermissions: any[];
    responseMessage: string = "";
    errorType: string = "";
    randomNo: number;
    protected _authUserService: AuthUserService;
    protected   _errorEmitService:ErrorEmitterService;
    protected   _mapperService:MapperService;
    constructor(
        private moduleType?: String
    ) {
        this._authUserService= AppInjector.injector.get(AuthUserService)
        this._errorEmitService= AppInjector.injector.get(ErrorEmitterService)
        this._mapperService= AppInjector.injector.get(MapperService)
    }

    ngOnInit(): void {
        this.randomNo= Math.random();
        this.userPermissions = this._authUserService.getPermissionsByModule(
            this.moduleType
          );
    }
    onError(response){
        this.errorType = "error";
        this.responseMessage = MESSAGES.UNKNOWN();
    }
}
