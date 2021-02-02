import { Observable } from 'rxjs';
import { RubixNetworkService } from '@shared/services/rubix-network/rubix-network.service.ts';
import { Injectable } from '@angular/core';
import { ChangePasswordModel } from './models/setting.model';
import { UPDATE_PASSWORD, UPDATE_PROFILE } from './setting.constant';
import { ReferenceService } from '@shared/services/reference/reference.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class SettingService {
    constructor(private _RubixNetworkService: RubixNetworkService, private _refService: ReferenceService) { }

    updatePassword(model: ChangePasswordModel): Observable<any>{
       return this._RubixNetworkService.onUpdate(UPDATE_PASSWORD, model);
    }
    updateProfile(model: ChangePasswordModel): Observable<any>{
       return this._RubixNetworkService.onUpdate(UPDATE_PROFILE, model);
    }
    getNationalities(): Observable<any>{
      return this._refService.getCountries();
    }
    
}
