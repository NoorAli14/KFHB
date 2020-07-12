import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../user.model";
import { NetworkService } from "@core/services/network/network.service";

@Injectable({
    providedIn: "root",
})
export class UserService  {
    constructor(
        private _networkService: NetworkService
    ) {
    }

    createUser(user: User) {
        return this._networkService.onCreate('api/users',user)
    }
    getUsers(): Observable<any> {
        return this._networkService.getAll("api/users")
    }
}
