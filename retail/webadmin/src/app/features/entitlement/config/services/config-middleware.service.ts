import { Injectable } from "@angular/core";
import { NetworkService } from "@core/services/network/network.service";
import { ROLE , MODULE, PERMISSION, ROLE_MODULE, ROLE_MODULE_PERMISSION, ROLE_MODULE_BY_ID} from '@feature/entitlement/entitlement.constant';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class ConfigMiddlewareService {
    constructor(private _networkService: NetworkService) {}
    getRoles() {
        return this._networkService.getAll(ROLE);
    }
    getModules() {
      return this._networkService.getAll(MODULE);
    }
    getPermissions() {
      return this._networkService.getAll(PERMISSION);
    }
    getRoleModulePermissions(roleModuleId) {
      return this._networkService.getAll(ROLE_MODULE_BY_ID,{roleModuleId});
    }
    forkConfigData(){
     return forkJoin([this.getModules(),this.getRoles(),this._networkService.getAll(ROLE_MODULE),this.getPermissions()])
    }
    forkPermissionData(roleModuleId){
     return forkJoin([this.getRoleModulePermissions(roleModuleId),this.getPermissions(),])
    }
    
}
