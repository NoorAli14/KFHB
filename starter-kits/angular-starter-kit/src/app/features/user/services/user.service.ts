import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
export class UserService implements Resolve<any> {
    onFilesChanged: BehaviorSubject<any>;
    onFileSelected: BehaviorSubject<any>;

    constructor(
        private _httpClient: HttpClient,
        private _networkService: NetworkService
    ) {
        // Set the defaults
        this.onFilesChanged = new BehaviorSubject({});
        this.onFileSelected = new BehaviorSubject({});
    }

    createUser(user: User) {
        return this._networkService.onCreate('api/users',user)
    }
    getUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get("api/users").subscribe((response: any) => {
                this.onFilesChanged.next(response);
                this.onFileSelected.next(response[0]);
                resolve(response);
            }, reject);
        });
    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getUsers()]).then(([files]) => {
                resolve();
            }, reject);
        });
    }

}
