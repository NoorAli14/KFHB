
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { throwError as observableThrowError, Observable } from "rxjs";
import { createUrl } from "@shared/constants/app.constants";


@Injectable({
    providedIn: "root",
})
export class NetworkService {
    constructor(private http: HttpClient) { }

    getAll(url: string, BaseUrl: string, params?: Object): Observable<any> {
        let endPoint = createUrl(url, BaseUrl);
        if (params) {
            endPoint = `${endPoint}?`;
            Object.keys(params).forEach((key) => {
                if (!params[key]) { return; }
                endPoint += `${key}=${params[key]}&`;
            });
        }
        return this.http
            .get<any>(endPoint, { params: new HttpParams().set('sortOrder', 'desc') })
            .pipe(catchError(this.errorHandler), retry(1));
    }

    getById(url, BaseUrl): Observable<any> {
        const endPoint = `${createUrl(url, BaseUrl)}`;
        return this.http
            .get<any>(endPoint, {})
            .pipe(catchError(this.errorHandlerMessage), retry(1));
    }

    post(url: string, BaseUrl: string, model: any, options?): Observable<any> {
        const endPoint = `${createUrl(url, BaseUrl)}`;
        return this.http
            .post<any[]>(endPoint, model, options)
    }

    onUpdate(url: string, model: any, BaseUrl): Observable<any> {
        const endPoint = `${createUrl(url, BaseUrl)}`;
        return this.http
            .put<any[]>(endPoint, model, BaseUrl)
            .pipe(catchError(this.errorHandlerMessage), retry(1));
    }

    onDelete(url: string, BaseUrl: string): Observable<any> {
        const endPoint = `${createUrl(url, BaseUrl)}`;
        return this.http
            .delete<any[]>(endPoint, {})
            .pipe(catchError(this.errorHandlerMessage), retry(1));
    }

    errorHandler(error: HttpErrorResponse) {
        return observableThrowError(error);
    }

    errorHandlerMessage(error: HttpErrorResponse) {
        return observableThrowError(error);
    }
}
