import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { User } from "../../models/user.model";
import { NetworkService } from "@core/services/network/network.service";
import { USER } from "../user.constant";
import { ROLE } from '@feature/entitlement/entitlement.constant';

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private _networkService: NetworkService) {}
    createUser(user: User) {
        return this._networkService.post(USER, user);
    }
    getUsers(): Observable<any> {
        return this._networkService.getAll(USER);
    }
    getRoles(): Observable<any> {
        return this._networkService.getAll(ROLE);
    }
    forkUserData(){
        return forkJoin([this.getUsers(),this.getRoles()])
    }
}
