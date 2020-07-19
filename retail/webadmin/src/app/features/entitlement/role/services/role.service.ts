import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { Role } from "../../models/role.model";
import { NetworkService } from "@core/services/network/network.service";
import { ROLE } from '@feature/entitlement/entitlement.constant';

@Injectable({
    providedIn: "root",
})
export class RoleService implements Resolve<any> {
    onRoleChanged: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient,
        private _networkService: NetworkService
    ) {
        this.onRoleChanged = new BehaviorSubject({});
    }
    createRole(user: Role) {
        return this._networkService.post(ROLE, user);
    }
    gerRoles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(ROLE).subscribe((response: any) => {
                this.onRoleChanged.next(response);
                resolve(response);
            }, reject);
        });
    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.gerRoles()]).then(([files]) => {
                resolve();
            }, reject);
        });
    }
}
