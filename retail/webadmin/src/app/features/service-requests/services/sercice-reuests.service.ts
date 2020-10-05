import { URI } from '@shared/constants/app.constants';
import { Injectable } from "@angular/core";
import { NetworkService } from "@shared/services/network/network.service";
import { ServiceRequests } from '../models/service-requests.model';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: "root",
})
export class ServiceRequestsService {
    constructor(private _networkService: NetworkService) { }

    getServiceRequests() {
        return this._networkService.getAll(URI.SERVICEREQUESTLIST, environment.API_BASE_URL);
    }

    getServiceRequestsById(id: string) {
        return this._networkService.getById(`${URI.SERVICEREQUESTDETAILS}${id}`, `${environment.API_BASE_URL}`);
    }

    updateStatus(data: any) {
        return this._networkService.post(`${URI.SERVICEREQUESTUBDATESTATUS}`, `${environment.API_BASE_URL}`, data);
    }





}
