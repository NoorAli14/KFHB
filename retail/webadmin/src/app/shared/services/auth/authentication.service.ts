import { APP_CONST } from "@shared/constants/app.constants";
import { URI } from "./../../../shared/constants/app.constants";
import { AuthUserService } from "@shared/services/user/auth-user.service";
import { NetworkService } from "@shared/services/network/network.service";
import { Login } from "./../../../auth/model/login.model";
import { throwError as observableThrowError, Observable, pipe } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { StorageService } from "../storage/storage.service";
import * as jwt_decode from "jwt-decode";
@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    constructor(
        private network: NetworkService,
        private userService: AuthUserService,
        private storage: StorageService,
    ) {}

    get accessToken() {
        return this.storage.getItem(APP_CONST.ACCESS_TOKEN);
    }
    get refreshToken() {
        return this.storage.getItem(APP_CONST.REFRESH_TOKEN);
    }
    set accessToken(token) {
        this.storage.setItem(APP_CONST.ACCESS_TOKEN, token);
    }

    set refreshToken(token) {
        this.storage.setItem(APP_CONST.REFRESH_TOKEN, token);
    }
    login(model: Login): Observable<any> {
        return this.network
            .post(URI.LOGIN, model, { observe: "response" })
            .pipe(
                map((response) => {
                    this.accessToken = response.headers.get("x-access-token");
                    this.refreshToken = response.headers.get("x-refresh-token");
                    this.userService.setData(response.body);
                    return response.body;
                }),
                catchError(this.errorHandler)
            );
    }
    forgotPassword(model: Login): Observable<any> {
        return this.network.post(URI.FORGOT_PASSWORD, model);
    }
    getUserByToken(token) {
        return this.network.getAll(`${URI.USER_INVITATION}/${token}`);
    }
    resetPassword(model: Login, token): Observable<any> {
        return this.network.onUpdate(`${URI.FORGOT_PASSWORD}/${token}`, model);
    }
    logout(): Observable<any> {
        return this.network.onDelete(`${URI.LOGOUT}`);
    }

    updateInvitation(model, token): Observable<any> {
        return this.network.onUpdate(`${URI.USER_INVITATION}/${token}`, model);
    }
    getTokenStatus(token): Observable<any> {
        return this.network.getAll(`${URI.FORGOT_PASSWORD}/${token}`);
    }
   
    errorHandler(response) {
        return observableThrowError(response.error || "Server Error");
    }
    getDecodeToken = () => {
        const token = this.accessToken
        return token ? jwt_decode(token) : null;
    };
    flushAll(){
       this.storage.clearAll();
    }
}
