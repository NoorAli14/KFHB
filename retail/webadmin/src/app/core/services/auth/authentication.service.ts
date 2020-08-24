import { URI } from './../../../shared/constants/app.constants';
import { AuthUserService } from '@core/services/user/auth-user.service';
import { NetworkService } from "@core/services/network/network.service";
import { Login } from "./../../../auth/model/login.model";
import { throwError as observableThrowError, Observable, pipe } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    constructor(
        private network: NetworkService,
        private userService: AuthUserService
    ) {}

    login(model: Login): Observable<any> {
        return this.network.post(URI.LOGIN, model)
        // .pipe(
        //     map((data) => {
        //         this.userService.setData(data);
        //         return data;
        //     }),
        //     catchError(this.errorHandler)
        // )
    }
    forgotPassword(model: Login): Observable<any> {
        return this.network.post(URI.FORGOT_PASSWORD, model)
    }
    
    resetPassword(model: Login): Observable<any> {
        return this.network.post(`${URI.FORGOT_PASSWORD}/token`, model)
    }
    logout(): Observable<any> {
        return this.network.onDelete(`${URI.LOGOUT}`)
    }

    getTokenStatus(): Observable<any> {
        return this.network.getAll(`${URI.FORGOT_PASSWORD}/token`)
    }

    errorHandler(error) {
        return observableThrowError(error.message || "Server Error");
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
