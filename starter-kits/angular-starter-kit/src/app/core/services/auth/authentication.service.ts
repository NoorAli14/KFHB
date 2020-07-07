import { throwError as observableThrowError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { LOGIN, FORGET_PASSWORD, VALIDATE_PASSWORD_TOKEN, UPDATE_PASSWORD, REFRESH_URL } from 'app/auth/auth.constant';
import { StorageService } from '@core/services/storage/storage.service';
import { UserService } from '@core/services/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private currentUser: UserService,
  ) {
  }

  login(userName, password): Observable<any> {
    const params = {
      ascUser: {
        userName,
        password
      }
    };
    const URL = `${environment.API_BASE_URL}${LOGIN}`
    return this.http.post<any>(URL, params, { observe: 'response' }).pipe(
      map(data => {
        const body = data.body;
        if (body.response) {
          this.currentUser.setAccessToken(data.headers.get('x-access-token'));
          this.currentUser.setRefreshToken(data.headers.get('x-refresh-token'));
          this.currentUser.setAll(body.response.ascUser);
        }
        return body;
      })
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }

  logout() {
    this.currentUser.flushAll();
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const token = this.currentUser.getToken();
      resolve(token ? true : false);
    });
  }
  isAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const data = this.currentUser.getUserData();
      if (!data) resolve(false);
      const user = data.user.roles.find(x => x.roleName == 'admin');
      resolve(user ? true : false);
    });
  }

  forgetPassword(userName): Observable<any> {
    const params = { ascUser: { userName } };
    const URL = `${environment.API_BASE_URL}${FORGET_PASSWORD}`
    return this.http.post<any>(URL, params);
  }

  validatePasswordToken(token): Observable<any> {
    const params = { ascUser: { token } };
    const URL = `${environment.API_BASE_URL}${VALIDATE_PASSWORD_TOKEN}`
    return this.http.post<any>(URL, params);
  }

  updatePassword(token, password): Observable<any> {
    const params = { ascUser: { token, password } };
    const URL = `${environment.API_BASE_URL}${UPDATE_PASSWORD}`
    return this.http.post<any>(URL, params);
  }
  refreshToken(token): Observable<any> {
    let httpHeaders = new HttpHeaders({ 'x-refresh-token': `${token}` });
    let options = {
      headers: httpHeaders
    };
    const URL = `${environment.API_BASE_URL}${REFRESH_URL}`
    return this.http.post<any>(URL, options);
  }
 
}
