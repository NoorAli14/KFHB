import { NetworkService } from '@shared/services/network/network.service';
import { Injectable } from '@angular/core';
import { ChangePasswordModel } from './models/setting.model';
import { UPDATE_PASSWORD, UPDATE_PROFILE } from './setting.constant';

@Injectable({providedIn: 'root'})
export class SettingService {
    constructor(private _networkService:NetworkService) { }

    updatePassword(model:ChangePasswordModel){
       return this._networkService.onUpdate(UPDATE_PASSWORD,model);
    }
    updateProfile(model:ChangePasswordModel){
       return this._networkService.onUpdate(UPDATE_PROFILE,model);
    }
    
}