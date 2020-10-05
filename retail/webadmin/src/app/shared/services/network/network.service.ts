
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { throwError as observableThrowError, Observable } from "rxjs";
import { createUrl } from "@shared/constants/app.constants";


@Injectable({
    providedIn: "root",
})
export class NetworkService {
    constructor(private http: HttpClient) { }

    getAll(url: string, BaseUrl: string, params?: Object, options?: Object): Observable<any> {
        let endPoint = createUrl(url, BaseUrl);
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

    getById(url, BaseUrl: string): Observable<any> {
        const endPoint = `${createUrl(url, BaseUrl)}`;
        return this.http
            .get<any>(endPoint, {})
            .pipe(catchError(this.errorHandlerMessage));
    }

    post(url: string, BaseUrl: string, model: any, options?): Observable<any> {
        const endPoint = `${createUrl(url, BaseUrl)}`;
        return this.http
            .post<any[]>(endPoint, model, options);
    }

    onUpdate(url: string, BaseUrl: string, model: any, options?): Observable<any> {
        const endPoint = `${createUrl(url, BaseUrl)}`;
        return this.http
            .put<any[]>(endPoint, model, options)
            .pipe(catchError(this.errorHandlerMessage));
    }

    onDelete(url: string, BaseUrl: string, options?): Observable<any> {
        const endPoint = `${createUrl(url, BaseUrl)}`;
        return this.http
            .delete<any[]>(endPoint, options)
            .pipe(catchError(this.errorHandlerMessage));
    }

    errorHandler = (error: HttpErrorResponse) => {
        return observableThrowError(error);
    }

    errorHandlerMessage = (error: HttpErrorResponse) => {
        return observableThrowError(error);
    }
}
