import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../user.model";
import { NetworkService } from "@shared/services/network/network.service";
import { USER } from '../user.constant';

@Injectable({
    providedIn: "root",
})
export class UserService  {
    constructor(
        private _networkService: NetworkService
    ) {
    }
    createUser(user: User) {
        return this._networkService.post(USER,user)
    }
    getUsers(): Observable<any> {
        return this._networkService.getAll(USER)
    }
}
