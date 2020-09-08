import { URI } from '@shared/constants/app.constants';
import { Injectable } from "@angular/core";

import { forkJoin } from "rxjs";
import { Role } from '@feature/entitlement/models/role.model';
import { NetworkService } from '@shared/services/network/network.service';

@Injectable({
    providedIn: "root",
})
export class ConfigMiddlewareService {
    constructor(private _networkService: NetworkService) {}
  

    getModules() {
        return this._networkService.getAll(URI.MODULE);
    }
     getRoles() {
        return this._networkService.getAll(URI.ROLE);
    }
    createRole(model: Role) {
        return this._networkService.post(URI.ROLE, model);
    }
    editRole(id: string,model: Role) {
        return this._networkService.onUpdate(`${URI.ROLE}/${id}`, model);
    }
    deleteRole(id: string) {
        return this._networkService.onDelete(`${URI.ROLE}/${id}`);
    }
    forkRolesData() {
        return forkJoin([
            this.getRoles(),
            this.getModules(),
            this.getPermissions()
        ]);
    }
    getPermissions() {
        return this._networkService.getAll(URI.PERMISSION);
    }
    getRoleModulePermissions(roleModuleId) {
        return this._networkService.getAll('ROLE_MODULE_BY_ID', { roleModuleId });
    }
 
}
