import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { NetworkService } from '@shared/services/network/network.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class ServiceRequestsService {
    constructor(private _networkService: NetworkService) { }
    getServiceRequests(): Observable<any> {
        return this._networkService.getAll(environment.API_BASE_URL_2, URI.SERVICE_REQUEST_LIST);
    }
    getServiceRequestsById(id: string): Observable<any> {
        return this._networkService.getById(`${environment.API_BASE_URL_2}`, `${URI.SERVICE_REQUEST_DETAILS}${id}`);
    }
    updateStatus(data: any): Observable<any> {
        return this._networkService.post(`${environment.API_BASE_URL_2}`, `${URI.SERVICE_REQUEST_UBDATE_STATUS}`, data);
    }
    getServiceRequestReport(): Observable<any> {
        return this._networkService.getAll(`${environment.API_BASE_URL_2}`, `${URI.SERVICE_REQUEST_REPORT}`);
    }
}
