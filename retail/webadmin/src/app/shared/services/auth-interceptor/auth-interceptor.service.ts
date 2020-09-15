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
import { APP_CONST, URI, createUrl } from "@shared/constants/app.constants";
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
    const hasRefreshToken = request.url.includes("refresh-token");
    const isPublicUrl= this.isPublicUrl(request.url)
    
    let httpOptions = this.getHttpOption(hasRefreshToken);

    //Refresh token
    if (!isPublicUrl && decodedToken && decodedToken.exp < current) {
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
    const endPoint = `${createUrl(URI.REFRESH)}`;
    return this.http.post(endPoint, null, { observe: 'response' });
  }
  getHttpOption(refreshing) {
    const token = this.storage.getItem(APP_CONST.ACCESS_TOKEN);
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        Accept: 'application/json, text/plain, */*',
        "x-tenant-id":'58B630C1-B884-43B1-AE17-E7214FDB09F7'
      })
    };

    if (!refreshing) {
      httpOptions.headers = httpOptions.headers.set('x-access-token', ` ${token}`);
    } else {
      const refreshToken = this.authService.refreshToken;
      httpOptions.headers = httpOptions.headers.set('x-refresh-token', ` ${refreshToken}`);
    }
    return httpOptions;
  }
  isPublicUrl(url){
    const authUrls=['login','logout','refresh-token']
    return authUrls.some(el => url.includes(el));
  }

}
