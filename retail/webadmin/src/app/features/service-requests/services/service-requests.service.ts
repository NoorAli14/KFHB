import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { RetailNetworkService } from '@shared/services/network/retail-network.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ServiceRequestsService {
    constructor(private _RetailNetworkService: RetailNetworkService) { }
    getServiceRequests(): Observable<any> {
        return this._RetailNetworkService.getAll(environment.API_BASE_URL, URI.SERVICE_REQUEST_LIST);
    }
    getServiceRequestsById(id: string): Observable<any> {
        return this._RetailNetworkService.getById(`${environment.API_BASE_URL}`, `${URI.SERVICE_REQUEST_DETAILS}${id}`);
    }
    updateStatus(data: any): Observable<any> {
        return this._RetailNetworkService.post(`${environment.API_BASE_URL}`, `${URI.SERVICE_REQUEST_UBDATE_STATUS}`, data);
    }
    getServiceRequestReport(): Observable<any> {
        return this._RetailNetworkService.getAll(`${environment.API_BASE_URL}`, `${URI.SERVICE_REQUEST_REPORT}`);
    }
}
