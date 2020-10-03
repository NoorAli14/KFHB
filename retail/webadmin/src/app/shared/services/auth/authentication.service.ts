import { APP_CONST } from '@shared/constants/app.constants';
import { URI } from './../../../shared/constants/app.constants';
import { AuthUserService } from '@shared/services/user/auth-user.service';
import { NetworkService } from '@shared/services/network/network.service';
import { Login } from './../../../auth/model/login.model';
import {
    throwError as observableThrowError,
    Observable,
    pipe,
    forkJoin,
} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { StorageService } from '../storage/storage.service';
import * as jwt_decode from 'jwt-decode';
import { ReferenceService } from '../reference/reference.service';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(
        private network: NetworkService,
        private userService: AuthUserService,
        private storage: StorageService,
        private _refService: ReferenceService
    ) {}

    get accessToken(): any {
        return this.storage.getItem(APP_CONST.ACCESS_TOKEN);
    }

    set accessToken(token) {
        this.storage.setItem(APP_CONST.ACCESS_TOKEN, token);
    }

    get refreshToken(): any {
        return this.storage.getItem(APP_CONST.REFRESH_TOKEN);
    }
    set refreshToken(token){
        this.storage.setItem(APP_CONST.REFRESH_TOKEN, token);
    }
   
    login(model: Login): Observable<any> {
        return this.network
            .post(URI.LOGIN, model, {
                headers: this.getPublicHeader(),
                observe: 'response',
            })
            .pipe(
                map((response) => {
                    this.accessToken = response.headers.get('x-access-token');
                    this.refreshToken = response.headers.get('x-refresh-token');
                    this.userService.setData(response.body);
                    return response.body;
                }),
                catchError(this.errorHandler)
            );
    }
    forgotPassword(model: Login): Observable<any> {
        return this.network.post(URI.FORGOT_PASSWORD, model, {
            headers: this.getPublicHeader(),
        });
    }
    getPublicHeader(): HttpHeaders {
        let headers = new HttpHeaders();
        return (headers = headers.set('public', 'true'));
    }
    getUserByToken(token): Observable<any> {
        return forkJoin([
            this.network.getAll(`${URI.USER_INVITATION}/${token}`, null, {
                headers: this.getPublicHeader(),
            }),
            this._refService.getCountries(),
        ]);
    }
    resetPassword(model: Login, token): Observable<any> {
        return this.network.onUpdate(
            `${URI.FORGOT_PASSWORD}/${token}`,
            model,
            { headers: this.getPublicHeader()}
        );
    }
    logout(): Observable<any> {
        return this.network.onDelete(`${URI.LOGOUT}`, { headers: this.getPublicHeader()});
    }

    updateInvitation(model, token): Observable<any> {
        return this.network.onUpdate(`${URI.USER_INVITATION}/${token}`, model, {
            headers: this.getPublicHeader(),
        });
    }
    getTokenStatus(token): Observable<any> {
        return this.network.getAll(`${URI.FORGOT_PASSWORD}/${token}`, {
            headers: this.getPublicHeader(),
        });
    }

    errorHandler(response): Observable<any> {
        return observableThrowError(response.error || 'Server Error');
    }
    getDecodeToken = () => {
        const token = this.accessToken;
        return token ? jwt_decode(token) : null;
    }
    flushAll(): void {
        this.storage.clearAll();
    }
}
