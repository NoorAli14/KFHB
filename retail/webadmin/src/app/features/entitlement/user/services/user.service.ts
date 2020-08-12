import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { User } from "../../models/user.model";
import { NetworkService } from "@core/services/network/network.service";
import { USER, USER_INVITATION } from "../user.constant";
import { ROLE } from '@feature/entitlement/entitlement.constant';

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private _networkService: NetworkService) {}
    createUser(user: User) {
        return this._networkService.post(USER_INVITATION, user);
    }
    getUsers(): Observable<any> {
        return this._networkService.getAll(USER);
    }
    getRoles(): Observable<any> {
        return this._networkService.getAll(ROLE);
    }
    editUser(id: string,model: User) {
        return this._networkService.onUpdate(`${USER}/${id}`, model);
    }
    deleteUser(id: string) {
        return this._networkService.onDelete(`${USER}/${id}`);
    }
    forkUserData(){
        return forkJoin([this.getUsers(),this.getRoles()])
    }
}
