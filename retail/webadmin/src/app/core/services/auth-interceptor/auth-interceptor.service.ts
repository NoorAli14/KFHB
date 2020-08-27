import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpClient,
    HttpResponse,
    HttpErrorResponse,
} from "@angular/common/http";
import { Observable, empty, of } from "rxjs";
import { StorageService } from "../storage/storage.service";
import { mergeMap, tap, catchError } from "rxjs/operators";
import { APP_CONST } from "@shared/constants/app.constants";
import { EventBusService } from "../event-bus/event-bus.service";
import { EmitEvent } from "@shared/models/emit-event.model";
import { Events } from "@shared/enums/events.enum";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    isRefreshTokenInProgress = false;
    constructor(
        private storage: StorageService,
        private http: HttpClient,
        private eventService: EventBusService
    ) {}


    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const decodedToken = "this.userService.getDecodeToken()";
        var current = new Date().getTime() / 1000;
        const hasRefreshToken = request.url.includes("refreshToken");
        let httpOptions = this.getHttpOption(hasRefreshToken);
        //Refresh token
        if (
            false
            // !hasRefreshToken
            //  &&  decodedToken && decodedToken.exp < current
        ) {
            // this.notification.refreshing();
            this.isRefreshTokenInProgress = true;
            return this.refreshToken().pipe(
                mergeMap((response) => {
                    const exception = response["body"]["exception"]
                        ? response["body"]["exception"][0]
                        : null;
                    if (
                        exception &&
                        (exception.name === "REFRESH_TOKEN_INVALID" ||
                            exception.name === "REFRESH_TOKEN_EXPIRED")
                    ) {
                        console.log(
                            "----------------------------Token expired------------------------"
                        );
                        // this.notification.expiredToken();
                        // this.eventService.emit(
                        //     // new EmitEvent(Events.SESSION_EXPIRED, true)
                        // );
                        return empty();
                    }
                    // this.notification.refreshed();
                    // this.userService.setAccessToken(response.headers.get('x-access-token'));
                    // this.userService.setRefreshToken(response.headers.get('x-refresh-token'));
                    console.log(
                        "----------------------------Token refreshed------------------------"
                    );


                    const options = this.getHttpOption(false);
                    const clonedRequest = request.clone(options);
                    return next.handle(clonedRequest);
                })
            );
        } else {
            debugger
            const clonedRequest = request.clone({...httpOptions, withCredentials: true});
            return next.handle(clonedRequest)
            // .pipe(
            //     tap(evt => {
            //         debugger
            //         if (evt instanceof HttpResponse) {
                      
            //         }
            //     }),
            //     catchError((err: any) => {
            //         debugger
            //         if(err instanceof HttpErrorResponse) {
                      
            //         }
            //         return of(err);
            //     }));
        }
    }
    refreshToken() {
        const URL = " ${environment.API_BASE_URL}${REFRESH_URL}";
        return this.http.post(URL, null, { observe: "response" });
    }
    getHttpOption(hasRefreshToken) {
        const token = this.storage.getItem(APP_CONST.ACCESS_TOKEN);
        let headers= new HttpHeaders({
            'content-type': 'application/json',
            // 'x-channel-id': 'environment.WEB_CHANNEL_ID',
            // 'x-trans-id': '1010111111101011111110101111111010111111145241',
            Accept: 'application/json, text/plain, */*',
            'x-access-token': token ? token :''
        })
        const httpOptions = {
            headers,
            withCredentials: true,
        };


        if (!hasRefreshToken) {
            // httpOptions.headers = httpOptions.headers.set('x-access-token', ` ${token}`);
        } else {
            const refreshToken = "this.userService.getRefreshToken();";
            httpOptions.headers = httpOptions.headers.set(
                "x-refresh-token",
                ` ${refreshToken}`
            );
        }
        return httpOptions;
    }
}
