import { URI } from '@shared/constants/app.constants';
import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { User } from "../../models/user.model";
import { NetworkService } from "@core/services/network/network.service";

@Injectable({
    providedIn: "root",
})
export class UserService {
    modules: Array<any> = [];
    constructor(private _networkService: NetworkService) {}
    createUser(user: User) {
        return this._networkService.post(URI.USER_INVITATION, user);
    }
    getUserById(id: string) {
        return this._networkService.getById(`${URI.USER}/${id}`);
    }
    getUsers(): Observable<any> {
        return this._networkService.getAll(URI.USER);
    }
    getRoles(): Observable<any> {
        return this._networkService.getAll(URI.ROLE);
    }
    editUser(id: string, model: User) {
        return this._networkService.onUpdate(`${URI.USER}/${id}`, model);
    }
    deleteUser(id: string) {
        return this._networkService.onDelete(`${URI.USER}/${id}`);
    }
    forkUserData() {
        return forkJoin([this.getUsers(), this.getRoles()]);
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
