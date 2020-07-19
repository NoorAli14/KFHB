import { Injectable } from "@angular/core";
import { NetworkService } from "@core/services/network/network.service";
import { ROLE , MODULE, PERMISSION, ROLE_MODULE} from '@feature/entitlement/entitlement.constant';
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
    forkConfigData(){
     return forkJoin([this.getModules(),this.getRoles(),this._networkService.getAll(ROLE_MODULE)])
    }
    
}
