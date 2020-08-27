import { APP_CONST } from '@shared/constants/app.constants';
import { URI } from './../../../shared/constants/app.constants';
import { AuthUserService } from '@core/services/user/auth-user.service';
import { NetworkService } from "@core/services/network/network.service";
import { Login } from "./../../../auth/model/login.model";
import { throwError as observableThrowError, Observable, pipe } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    constructor(
        private network: NetworkService,
        private userService: AuthUserService,
        private storage: StorageService
    ) {}

    login(model: Login): Observable<any> {
        return this.network.post(URI.LOGIN, model,{ observe: 'response'})
        .pipe(
            map((response) => {
                this.storage.setItem(APP_CONST.ACCESS_TOKEN,response.headers.get('x-access-token'));
                this.userService.setData(response.body);
                return response.body;
            }),
            catchError(this.errorHandler)
        )
    }
    forgotPassword(model: Login): Observable<any> {
        return this.network.post(URI.FORGOT_PASSWORD, model)
    }
    getUserByToken(token){
        return this.network.getAll(`${URI.USER_INVITATION}/${token}`)
    }
    resetPassword(model: Login,token): Observable<any> {
        return this.network.onUpdate(`${URI.FORGOT_PASSWORD}/${token}`, model)
    }
    logout(): Observable<any> {
        return this.network.onDelete(`${URI.LOGOUT}`)
    }
    updateInvitation(model,token): Observable<any> {
        return this.network.onUpdate(`${URI.USER_INVITATION}/${token}`,model)
    }
    getTokenStatus(token): Observable<any> {
        return this.network.getAll(`${URI.FORGOT_PASSWORD}/${token}`)
    }

    errorHandler(response) {
        return observableThrowError(response.error || "Server Error");
    }


    // refreshToken(token): Observable<any> {
    //     let httpHeaders = new HttpHeaders({ "x-refresh-token": `${token}` });
    //     let options = {
    //         headers: httpHeaders,
    //     };
    //     const URL = `${environment.API_BASE_URL}${'REFRESH_URL'}`;
    //     return this.http.post<any>(URL, options);
    // }
}
