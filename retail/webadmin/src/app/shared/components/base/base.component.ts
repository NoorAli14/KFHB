import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "@shared/services/user/auth-user.service";
import { MESSAGES } from '@shared/constants/app.constants';
import { ErrorEmitterService } from '@shared/services/error-emitter/error-emitter.service';
import {Injector} from '@angular/core';
import { MapperService } from '@shared/services/mappers/mapper.service';
import { Subject } from 'rxjs';
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
    protected _unsubscribeAll: Subject<any>;
    protected _authUserService: AuthUserService;
    protected   _errorEmitService:ErrorEmitterService;
    protected   _mapperService:MapperService;
    constructor(
        private injector: Injector,
        private moduleType?: String, 
    ) {
        this._authUserService= injector.get(AuthUserService)
        this._errorEmitService= injector.get(ErrorEmitterService)
        this._mapperService= injector.get(MapperService);
        this._unsubscribeAll = new Subject();
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
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
