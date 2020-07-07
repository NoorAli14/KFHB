import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpClient
} from '@angular/common/http';
import { Observable,  empty } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import {  mergeMap } from 'rxjs/operators';
import { USER_CONST } from '@shared/constants/app.constants';
import { UserService } from '../user.service';
import { environment } from '@environments/environment';
import { REFRESH_URL } from 'app/auth/auth.constant';
import { EventBusService } from '../event-bus/event-bus.service';
import { EmitEvent } from '@shared/models/emit-event.model';
import { Events } from '@shared/enums/events.enum';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  isRefreshTokenInProgress = false;
  constructor(private storage: StorageService,
    private http: HttpClient,
    private eventService: EventBusService,
    private userService: UserService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const decodedToken = this.userService.getDecodeToken();
    var current = (new Date().getTime() / 1000);
    const hasRefreshToken = request.url.includes("refreshToken");
    let httpOptions = this.getHttpOption(hasRefreshToken);

    //Refresh token
    if (!hasRefreshToken && decodedToken && decodedToken.exp < current) {
      // this.notification.refreshing();
      this.isRefreshTokenInProgress = true;
      return this.refreshToken()
        .pipe(
          mergeMap((response) => {
            const exception = response['body']['exception'] ? response['body']['exception'][0] : null;
            if (exception && (exception.name === 'REFRESH_TOKEN_INVALID' || exception.name === 'REFRESH_TOKEN_EXPIRED')) {
              console.log('----------------------------Token expired------------------------');
              // this.notification.expiredToken();
              this.eventService.emit(new EmitEvent(Events.SESSION_EXPIRED, true))
              return empty()
            }
            // this.notification.refreshed();
            this.userService.setAccessToken(response.headers.get('x-access-token'));
            this.userService.setRefreshToken(response.headers.get('x-refresh-token'));
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
    const URL = `${environment.API_BASE_URL}${REFRESH_URL}`
    return this.http.post(URL, null, { observe: 'response' });
  }
  getHttpOption(hasRefreshToken) {
    const token = this.storage.getItem(USER_CONST.ACCESS_TOKEN);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'x-channel-id': environment.WEB_CHANNEL_ID,
        'x-trans-id': '1010111111101011111110101111111010111111145241',
        Accept: 'application/json, text/plain, */*'
      })
    };

    if (!hasRefreshToken) {
      httpOptions.headers = httpOptions.headers.set('x-access-token', ` ${token}`);
    } else {
      const refreshToken = this.userService.getRefreshToken();
      httpOptions.headers = httpOptions.headers.set('x-refresh-token', ` ${refreshToken}`);
    }
    return httpOptions;
  }
}
