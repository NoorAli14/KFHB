
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { throwError as observableThrowError, Observable } from "rxjs";
import { createUrl } from "@shared/constants/app.constants";


@Injectable({
    providedIn: "root",
})
export class NetworkService {
    constructor(private http: HttpClient) {}

    getAll(url: string, params?: Object): Observable<any> {
        let endPoint = createUrl(url);
        if (params) {
            endPoint = `${endPoint}?`;
            Object.keys(params).forEach((key) => {
                if (!params[key]) return;
                endPoint += `${key}=${params[key]}&`;
            });
        }
        return this.http
            .get<any>(endPoint, {})
            .pipe(catchError(this.errorHandler), retry(1));
    }

    getById(url): Observable<any> {
        const endPoint = `${createUrl(url)}`;
        return this.http
            .get<any>(endPoint, {})
            .pipe(catchError(this.errorHandlerMessage), retry(1));
    }

    post(url: string, model: any, options?): Observable<any> {
        const endPoint = `${createUrl(url)}`;
        return this.http
            .post<any[]>(endPoint, model, options)
            .pipe(catchError(this.errorHandlerMessage), retry(1));
    }

    onUpdate(url: string, model: any): Observable<any> {
        const endPoint = `${createUrl(url)}`;
        return this.http
            .put<any[]>(endPoint, model)
            .pipe(catchError(this.errorHandlerMessage), retry(1));
    }

    onDelete(url: string): Observable<any> {
        const endPoint = `${createUrl(url)}`;
        return this.http
            .delete<any[]>(endPoint, {})
            .pipe(catchError(this.errorHandlerMessage), retry(1));
    }

    errorHandler(error: HttpErrorResponse) {
        return observableThrowError(error.error || "Server Error");
    }

    errorHandlerMessage(error: HttpErrorResponse) {
        return observableThrowError(error.error || "Server Error");
    }
}
