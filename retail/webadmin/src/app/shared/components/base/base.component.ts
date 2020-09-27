import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "@shared/services/user/auth-user.service";
import { ErrorEmitterService } from '@shared/services/error-emitter/error-emitter.service';
import {Injector} from '@angular/core';
import { MapperService } from '@shared/services/mappers/mapper.service';
import { Subject } from 'rxjs';
import { MESSAGES } from '@shared/constants/messages.constant';
import { MatDialog } from '@angular/material/dialog';
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
    protected _dialogRef: MatDialog
    constructor(
        private injector: Injector,
        private moduleType?: String, 
    ) {
        this._authUserService= injector.get(AuthUserService)
        this._errorEmitService= injector.get(ErrorEmitterService)
        this._mapperService= injector.get(MapperService);
        this._dialogRef= injector.get(MatDialog); 
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        debugger
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
