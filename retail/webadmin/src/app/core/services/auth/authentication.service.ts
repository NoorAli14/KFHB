import { AuthUserService } from '@core/services/user/auth-user.service';
import { NetworkService } from "@core/services/network/network.service";
import { Login } from "./../../../auth/model/login.model";
import { throwError as observableThrowError, Observable, pipe } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { LOGIN, FORGOT_PASSWORD } from "app/auth/auth.constant";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService {
    constructor(
        private network: NetworkService,
        private userService: AuthUserService
    ) {}

    login(model: Login): Observable<any> {
        return this.network.post(LOGIN, model).pipe(
            map((data) => {
                this.userService.setData=data;
                return data;
            })
        );
    }
    forgotPassword(model: Login): Observable<any> {
        return this.network.post(FORGOT_PASSWORD, model)
    }

    errorHandler(error: HttpErrorResponse) {
        return observableThrowError(error.message || "Server Error");
    }

    // isAuthenticated(): Promise<boolean> {
    //     return new Promise<boolean>((resolve, reject) => {
    //         const token = this.currentUser.getToken();
    //         resolve(token ? true : false);
    //     });
    // }

    // refreshToken(token): Observable<any> {
    //     let httpHeaders = new HttpHeaders({ "x-refresh-token": `${token}` });
    //     let options = {
    //         headers: httpHeaders,
    //     };
    //     const URL = `${environment.API_BASE_URL}${'REFRESH_URL'}`;
    //     return this.http.post<any>(URL, options);
    // }
}
