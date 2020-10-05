import { URI } from '@shared/constants/app.constants';
import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { User } from "../../models/user.model";
import { NetworkService } from '@shared/services/network/network.service';
import { ReferenceService } from '@shared/services/reference/reference.service';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: "root",
})
export class UserService {
    modules: Array<any> = [];
    constructor(private _networkService: NetworkService, private _refService: ReferenceService) { }
    createUser(user: User) {
        return this._networkService.post(URI.USER_INVITATION, environment.API_BASE_URL_2, user);
    }
    resendInvite(id: string) {
        return this._networkService.post(`${URI.USER_INVITATION}/${id}/resend`, `${environment.API_BASE_URL_2}`, {});
    }
    getUserById(id: string) {
        return this._networkService.getById(`${URI.USER}/${id}`, `${environment.API_BASE_URL_2}`);
    }
    getUsers(): Observable<any> {
        return this._networkService.getAll(URI.USER, environment.API_BASE_URL_2);
    }
    getRoles(): Observable<any> {
        return this._networkService.getAll(URI.ROLE, environment.API_BASE_URL_2);
    }
    editUser(id: string, model: User) {
        return this._networkService.onUpdate(`${URI.USER}/${id}`, `${environment.API_BASE_URL_2}`, model);
    }
    deleteUser(id: string) {
        return this._networkService.onDelete(`${URI.USER}/${id}`, `${environment.API_BASE_URL_2}`);
    }
    forkUserData() {
        return forkJoin([this.getUsers(), this.getRoles(), this._refService.getCountries()]);
    }
    mapModules(modules) {
        this.modules = [];
        this.makeFlat(modules, "");
        return this.modules;
    }
    makeFlat(modules: any[], parent) {
        modules.forEach((item) => {
            item.parent = parent;
            this.modules.push(item);
            if (item.sub_modules) {
                this.makeFlat(item.sub_modules, item.name);
            }
        });
    }
}
