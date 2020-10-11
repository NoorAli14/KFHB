import { Component, Inject, OnInit } from '@angular/core';
import { AuthUserService } from '@shared/services/user/auth-user.service';
import {Injector} from '@angular/core';
import { MapperService } from '@shared/services/mappers/mapper.service';
import { Subject } from 'rxjs';
import { MESSAGES } from '@shared/constants/messages.constant';
import { NotifierService } from '@shared/services/notifier/notifier.service';
@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styles: [],
})
export class BaseComponent implements OnInit {
    userPermissions: any[];
    responseMessage = '';
    errorType = '';
    protected _unsubscribeAll: Subject<any>;
    protected _authUserService: AuthUserService;
    protected   _mapperService: MapperService;
    protected _notifier: NotifierService;
    constructor(
        private injector: Injector,
        @Inject(String)  private  moduleType?: string, 
    ) {
        this._authUserService = injector.get(AuthUserService);
        this._mapperService = injector.get(MapperService);
        this._notifier = injector.get(NotifierService); 
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.userPermissions = this._authUserService.getPermissionsByModule(
            this.moduleType
          );
    }
    onError(response): void{
        this.errorType = 'error';
        this.responseMessage = MESSAGES.UNKNOWN;
    }
   
}
