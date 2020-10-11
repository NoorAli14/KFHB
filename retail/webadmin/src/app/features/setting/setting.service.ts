import { Observable } from 'rxjs';
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

   updatePassword(model: ChangePasswordModel): Observable<any> {
      return this._networkService.onUpdate(environment.API_BASE_URL, UPDATE_PASSWORD, model);
   }
   updateProfile(model: ChangePasswordModel): Observable<any> {
      return this._networkService.onUpdate(environment.API_BASE_URL, UPDATE_PROFILE, model);
   }
   getNationalities(): Observable<any> {
      return this._refService.getCountries();
   }

}
