import { URI } from "@shared/constants/app.constants";
import { Injectable } from "@angular/core";

import { forkJoin } from "rxjs";
import { Role } from "@feature/entitlement/models/role.model";
import { NetworkService } from "@shared/services/network/network.service";
import { environment } from "../../../../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class RoleService {
    constructor(private _networkService: NetworkService) { }
    getModules() {
        return this._networkService.getAll(URI.MODULE, environment.API_BASE_URL_2);
    }
    getRoles() {
        return this._networkService.getAll(URI.ROLE, environment.API_BASE_URL_2);
    }
    createRole(model: Role) {
        return this._networkService.post(URI.ROLE, environment.API_BASE_URL_2, model);
    }
    editRole(id: string, model: Role) {
        return this._networkService.onUpdate(`${URI.ROLE}/${id}`, `${environment.API_BASE_URL_2}`, model);
    }
    deleteRole(id: string) {
        return this._networkService.onDelete(`${URI.ROLE}/${id}`, `${environment.API_BASE_URL_2}`,);
    }
    forkRolesData() {
        return forkJoin([
            this.getRoles(),
            this.getModules(),
            this.getPermissions(),
        ]);
    }
    getPermissions() {
        return this._networkService.getAll(URI.PERMISSION, environment.API_BASE_URL_2);
    }
    getSelectedPermissions(data, element) {
        const checked = Object.keys(element).filter((key) => {
            return element[key] == true;
        });
        const module = data.modules.find(
            (module) => module.id === element.module.id
        );
        const permissions = [];
        checked.forEach((key) => {
            const permission = element.module.permissions.find(
                (item) => item.record_type == key
            );

            permissions.push({ id: permission.module_permission_id });
        });
        if (data.role.id && data.role.id.length > 0) {
            module.permissions.forEach((x) => {
                const exist = permissions.find(
                    (item) => item.id == x.module_permission_id
                );
                if (!exist && x.value) {
                    permissions.push({
                        id: x.module_permission_id,
                        _deleted: true,
                    });
                }
            });
        }

        return permissions;
    }
}
