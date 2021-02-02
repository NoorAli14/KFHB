
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { createRubixUrl } from '@shared/constants/app.constants';


@Injectable({
    providedIn: 'root',
})
export class RubixNetworkService {
    constructor(private http: HttpClient) {}

    getAll(url: string, params?: object, options?: object): Observable<any> {
        let endPoint = createRubixUrl(url);
        if (params) {
            endPoint = `${endPoint}?`;
            Object.keys(params).forEach((key) => {
                if (!params[key]) { return; }
                endPoint += `${key}=${params[key]}&`;
            });
        }
        return this.http
            .get<any>(endPoint, options)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    getById(url): Observable<any> {
        const endPoint = `${createRubixUrl(url)}`;
        return this.http
            .get<any>(endPoint, {})
            .pipe(catchError(this.errorHandlerMessage));
    }

    post(url: string, model: any, options?): Observable<any> {
        const endPoint = `${createRubixUrl(url)}`;
        return this.http
            .post<any[]>(endPoint, model, options) .pipe(
                catchError(this.errorHandler)
            );
    }

    onUpdate(url: string, model: any, options?): Observable<any> {
        const endPoint = `${createRubixUrl(url)}`;
        return this.http
            .put<any[]>(endPoint, model, options)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    onDelete(url: string, options?): Observable<any> {
        const endPoint = `${createRubixUrl(url)}`;
        return this.http
            .delete<any[]>(endPoint, options)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    errorHandler(response: HttpErrorResponse): Observable<any> {
        return observableThrowError(response.error || 'Internal Server Error');
    }

    errorHandlerMessage(error: HttpErrorResponse): Observable<any> {
        return observableThrowError(error);
    }
}
