
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError as observableThrowError, Observable, from } from 'rxjs';
import { createRetailUrl } from '@shared/constants/app.constants';
import { EncryptionHelper } from '../helpers/encryption.helper';


@Injectable({
    providedIn: 'root',
})
export class RetailNetworkService {
    constructor(private http: HttpClient, private encrypter: EncryptionHelper) { }

    getAll(baseUrl: string, url: string, params?: object, options?: object): Observable<any> {
        let endPoint = createRetailUrl(baseUrl, url);
        if (params) {
            endPoint = `${endPoint}?`;
            Object.keys(params).forEach((key) => {
                if (!params[key]) { return; }
                endPoint += `${key}=${params[key]}&`;
            });
        }
        return this.http
            .get<any>(endPoint, options)
            .pipe(catchError(this.errorHandler));
    }

    getById(baseUrl: string, url): Observable<any> {
        const endPoint = `${createRetailUrl(baseUrl, url)}`;
        return this.http
            .get<any>(endPoint, {})
            .pipe(catchError(this.errorHandlerMessage));
    }

    post(baseUrl: string, url: string, model: any, options?): Observable<any> {
        const endPoint = `${createRetailUrl(baseUrl, url)}`;
        const encryptedMessage = this.encrypter.encryptCustom(model);
        const req = JSON.stringify({ Data: encryptedMessage });
        return this.http
            .post<any[]>(endPoint, req, options);
    }
    postSafe(baseUrl: string, url: string, model: any, options?): Observable<any> {
        const endPoint = `${createRetailUrl(baseUrl, url)}`;
        const req = JSON.stringify(model);
        return this.http
            .post<any[]>(endPoint, req, options);
    }
    onUpdate(baseUrl: string, url: string, model: any, options?): Observable<any> {
        const endPoint = `${createRetailUrl(baseUrl, url)}`;
        return this.http
            .put<any[]>(endPoint, model, options)
            .pipe(catchError(this.errorHandlerMessage));
    }

    onDelete(baseUrl: string, url: string, options?): Observable<any> {
        const endPoint = `${createRetailUrl(baseUrl, url)}`;
        return this.http
            .delete<any[]>(endPoint, options)
            .pipe(catchError(this.errorHandlerMessage));
    }

    errorHandler(error: HttpErrorResponse): Observable<any> {
        return observableThrowError(error);
    }

    errorHandlerMessage(error: HttpErrorResponse): Observable<any> {
        return observableThrowError(error);
    }
}
