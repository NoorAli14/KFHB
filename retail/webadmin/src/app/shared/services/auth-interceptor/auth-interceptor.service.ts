import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpClient,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { StorageService } from "../storage/storage.service";
import { catchError, mergeMap } from "rxjs/operators";
import { APP_CONST, URI, createUrl } from "@shared/constants/app.constants";
import { EventBusService } from "../event-bus/event-bus.service";
import { AuthenticationService } from "../auth/authentication.service";
import { Router } from '@angular/router';
import { environment } from "../../../../environments/environment";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    isRefreshTokenInProgress = false;
    constructor(
        private storage: StorageService,
        private http: HttpClient,
        private eventService: EventBusService,
        private authService: AuthenticationService, private router: Router
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const decodedToken = this.authService.getDecodeToken();
        var current = new Date().getTime() / 1000;
        const hasRefreshToken = request.url.includes("refresh-token");
        let httpOptions = this.getHttpOption(hasRefreshToken, request.url);

        const isPublicUrl =
            httpOptions.headers.get("public") || request.headers.get("public")
                ? true
                : false;

        // Refresh token
        if (!isPublicUrl && decodedToken && decodedToken.exp < current) {
            this.isRefreshTokenInProgress = true;
            return this.refreshToken().pipe(
                mergeMap((response) => {
                    if (response["body"] && response["body"]["status"]) {
                        this.authService.accessToken = response.headers.get(
                            "x-access-token"
                        );
                        this.authService.refreshToken = response.headers.get(
                            "x-refresh-token"
                        );
                        console.log(
                            "----------------------------Token refreshed------------------------"
                        );

                        const options = this.getHttpOption(false, request.url);
                        const clonedRequest = request.clone(options);
                        return next.handle(clonedRequest);
                    }

                    // this.eventService.emit(
                    //     new EmitEvent(Events.SESSION_EXPIRED, true)
                    // );
                    // return empty();
                }),
                catchError((error: any) => {
                    console.log(error);
                    console.log(
                        "----------------------------Token expired------------------------"
                    );
                    this.router.navigateByUrl('/auth/login');
                    return throwError(error)
                })
            );
        } else {
            const clonedRequest = request.clone(httpOptions);
            return next.handle(clonedRequest);
        }
    }
    refreshToken() {
        const endPoint = `${createUrl(URI.REFRESH, environment.API_BASE_URL_2)}`;
        return this.http.post(endPoint, null, { observe: "response" });
    }
    getHttpOption(refreshing, url?): any {
        const token = this.storage.getItem(APP_CONST.ACCESS_TOKEN);
        const httpOptions = {
            headers: new HttpHeaders({
                "content-type": "application/json",
                'Accept': "application/json, text/plain, */*",
                "x-tenant-id": environment.TENANT_ID,
            }),
        };

        if (url.includes('http://rubix-dev01.conduit-aiondigital.com/')) {
            httpOptions.headers = httpOptions.headers.set(
                "x-channel-id", environment.CHANNEL_ID
            );
        }

        if (!refreshing) {
            httpOptions.headers = httpOptions.headers.set(
                "x-access-token",
                ` ${token}`
            );
        } else {
            const refreshToken = this.authService.refreshToken;
            httpOptions.headers = httpOptions.headers
                .set("x-refresh-token", ` ${refreshToken}`)
                .set("public", `true`);
        }
        return httpOptions;
    }
}
