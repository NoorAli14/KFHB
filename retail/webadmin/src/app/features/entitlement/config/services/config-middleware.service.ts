import { Modules } from "@feature/entitlement/models/modules.model";
import { Injectable } from "@angular/core";
import { NetworkService } from "@core/services/network/network.service";
import {
    ROLE,
    MODULE,
    PERMISSION,
    ROLE_MODULE,
    ROLE_MODULE_PERMISSION,
    ROLE_MODULE_BY_ID,
} from "@feature/entitlement/entitlement.constant";
import { forkJoin } from "rxjs";
import { Role } from '@feature/entitlement/models/role.model';

@Injectable({
    providedIn: "root",
})
export class ConfigMiddlewareService {
    constructor(private _networkService: NetworkService) {}
  

    // ************************Modules Section**********************************
    getModules() {
        return this._networkService.getAll(MODULE);
    }
    createModule(model: Modules) {
        return this._networkService.post(MODULE, model);
    }
    editModule(id: string,model: Modules) {
        return this._networkService.onUpdate(`${MODULE}/${id}`, model);
    }
    deleteModule(id: string) {
        return this._networkService.onDelete(`${MODULE}/${id}`);
    }
     // ************************Roles Section**********************************
     getRoles() {
        return this._networkService.getAll(ROLE);
    }
    createRole(model: Role) {
        return this._networkService.post(ROLE, model);
    }
    editRole(id: string,model: Role) {
        return this._networkService.onUpdate(`${ROLE}/${id}`, model);
    }
    deleteRole(id: string) {
        return this._networkService.onDelete(`${ROLE}/${id}`);
    }
    forkRolesData() {
        return forkJoin([
            this.getRoles(),
            this.getModules()
        ]);
    }
    // ************************Roles Section**********************************
    getPermissions() {
        return this._networkService.getAll(PERMISSION);
    }
    getRoleModulePermissions(roleModuleId) {
        return this._networkService.getAll(ROLE_MODULE_BY_ID, { roleModuleId });
    }
    forkConfigData() {
        return forkJoin([
            this.getModules(),
            this.getRoles(),
            this._networkService.getAll(ROLE_MODULE),
            this.getPermissions(),
        ]);
    }
    forkModulesData() {
        return forkJoin([this.getModules(), this.getPermissions()]);
    }
    forkPermissionData(roleModuleId) {
        return forkJoin([
            this.getRoleModulePermissions(roleModuleId),
            this.getPermissions(),
        ]);
    }
}
