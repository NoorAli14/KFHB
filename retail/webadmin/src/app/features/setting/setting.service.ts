import { NetworkService } from '@shared/services/network/network.service';
import { Injectable } from '@angular/core';
import { ChangePasswordModel } from './models/setting.model';
import { UPDATE_PASSWORD, UPDATE_PROFILE } from './setting.constant';
import { ReferenceService } from '@shared/services/reference/reference.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SettingService {
   constructor(private _networkService: NetworkService, private _refService: ReferenceService) { }

   updatePassword(model: ChangePasswordModel) {
      return this._networkService.onUpdate(UPDATE_PASSWORD, environment.API_BASE_URL_2, model);
   }
   updateProfile(model: ChangePasswordModel) {
      return this._networkService.onUpdate(UPDATE_PROFILE, environment.API_BASE_URL_2, model);
   }
   getNationalities() {
      return this._refService.getCountries();
   }

}