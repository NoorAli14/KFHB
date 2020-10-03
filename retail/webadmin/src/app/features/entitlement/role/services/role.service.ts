import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';

import { forkJoin, Observable } from 'rxjs';
import { Role } from '@feature/entitlement/models/role.model';
import { NetworkService } from '@shared/services/network/network.service';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(private _networkService: NetworkService) {}
    getModules(): Observable< any> {
        return this._networkService.getAll(URI.MODULE);
    }
    getRoles(): Observable< any> {
        return this._networkService.getAll(URI.ROLE);
    }
    createRole(model: Role): Observable< any> {
        return this._networkService.post(URI.ROLE, model);
    }
    editRole(id: string, model: Role): Observable< any> {
        return this._networkService.onUpdate(`${URI.ROLE}/${id}`, model);
    }
    deleteRole(id: string): Observable< any> {
        return this._networkService.onDelete(`${URI.ROLE}/${id}`);
    }
    forkRolesData(): Observable< any> {
        return forkJoin([
            this.getRoles(),
            this.getModules(),
            this.getPermissions(),
        ]);
    }
    getPermissions(): Observable< any> {
        return this._networkService.getAll(URI.PERMISSION);
    }
    getSelectedPermissions(data, element): any {
        const checked = Object.keys(element).filter((key) => {
            return element[key] === true;
        });
        const module = data.modules.find(
            (item) => item.id === element.item.id
        );
        const permissions = [];
        checked.forEach((key) => {
            const permission = element.module.permissions.find(
                (item) => item.record_type === key
            );

            permissions.push({ id: permission.module_permission_id });
        });
        if (data.role.id && data.role.id.length > 0) {
            module.permissions.forEach((x) => {
                const exist = permissions.find(
                    (item) => item.id === x.module_permission_id
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
