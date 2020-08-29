import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpClient,
} from "@angular/common/http";
import { Observable, empty, of } from "rxjs";
import { StorageService } from "../storage/storage.service";
import { mergeMap, } from "rxjs/operators";
import { APP_CONST, URI } from "@shared/constants/app.constants";
import { EventBusService } from "../event-bus/event-bus.service";
import { EmitEvent } from "@shared/models/emit-event.model";
import { Events } from "@shared/enums/events.enum";
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    isRefreshTokenInProgress = false;
    constructor(
        private storage: StorageService,
        private http: HttpClient,
        private eventService: EventBusService,
        private authService:AuthenticationService
    ) {}


    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
      
    const decodedToken = this.authService.getDecodeToken();
    var current = (new Date().getTime() / 1000);
    const hasRefreshToken = request.url.includes("refreshToken");
    let httpOptions = this.getHttpOption(hasRefreshToken);

    //Refresh token
    if (!hasRefreshToken && decodedToken && decodedToken.exp < current) {
      this.isRefreshTokenInProgress = true;
      return this.refreshToken()
        .pipe(
          mergeMap((response) => {
            const exception = response['body']['exception'] ? response['body']['exception'][0] : null;
            if (exception && (exception.name === 'REFRESH_TOKEN_INVALID' || exception.name === 'REFRESH_TOKEN_EXPIRED')) {
              console.log('----------------------------Token expired------------------------');
              this.eventService.emit(new EmitEvent(Events.SESSION_EXPIRED, true))
              return empty()
            }
            this.authService.accessToken = response.headers.get("x-access-token");
            this.authService.refreshToken = response.headers.get("x-refresh-token");

            console.log('----------------------------Token refreshed------------------------');

            const options = this.getHttpOption(false);
            const clonedRequest = request.clone(options);
            return next.handle(clonedRequest);
          })
        )
    } else {
      const clonedRequest = request.clone(httpOptions)
      return next.handle(clonedRequest);
    }
  }
  refreshToken() {
    return this.http.post(URI.REFRESH, null, { observe: 'response' });
  }
  getHttpOption(hasRefreshToken) {
    const token = this.storage.getItem(APP_CONST.ACCESS_TOKEN);
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Accept: 'application/json, text/plain, */*'
      })
    };

    if (!hasRefreshToken) {
      httpOptions.headers = httpOptions.headers.set('x-access-token', ` ${token}`);
    } else {
      const refreshToken = this.authService.refreshToken;
      httpOptions.headers = httpOptions.headers.set('x-refresh-token', ` ${refreshToken}`);
    }
    return httpOptions;
  }
}
