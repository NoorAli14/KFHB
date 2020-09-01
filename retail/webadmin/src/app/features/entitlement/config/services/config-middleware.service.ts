import { URI } from './../../../../shared/constants/app.constants';
import { Modules } from "@feature/entitlement/models/modules.model";
import { Injectable } from "@angular/core";
import { NetworkService } from "@core/services/network/network.service";

import { forkJoin } from "rxjs";
import { Role } from '@feature/entitlement/models/role.model';

@Injectable({
    providedIn: "root",
})
export class ConfigMiddlewareService {
    constructor(private _networkService: NetworkService) {}
  

    // ************************Modules Section**********************************
    getModules() {
        return this._networkService.getAll(URI.MODULE);
    }
    createModule(model: Modules) {
        return this._networkService.post(URI.MODULE, model);
    }
    editModule(id: string,model: Modules) {
        return this._networkService.onUpdate(`${URI.MODULE}/${id}`, model);
    }
    deleteModule(id: string) {
        return this._networkService.onDelete(`${URI.MODULE}/${id}`);
    }
     // ************************Roles Section**********************************
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
            this.getModules()
        ]);
    }
    // ************************Roles Section**********************************
    getPermissions() {
        return this._networkService.getAll(URI.PERMISSION);
    }
    getRoleModulePermissions(roleModuleId) {
        return this._networkService.getAll('ROLE_MODULE_BY_ID', { roleModuleId });
    }
    forkConfigData() {
        return forkJoin([
            this.getModules(),
            this.getRoles(),
            this._networkService.getAll('ROLE_MODULE'),
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
