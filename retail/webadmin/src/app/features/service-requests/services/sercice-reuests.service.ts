import { URI } from '@shared/constants/app.constants';
import { Injectable } from "@angular/core";
import { NetworkService } from "@shared/services/network/network.service";
import { ServiceRequests } from '../models/service-requests.model';


@Injectable({
    providedIn: "root",
})
export class ServiceRequestsService {
    constructor(private _networkService: NetworkService) {}

    getServiceRequests() {
        return this._networkService.getAll(URI.SERVICEREQUESTLIST);
    }

    getServiceRequestsById(id: string) {
        return this._networkService.getById(`${URI.SERVICEREQUESTDETAILS}${id}`);
    }

    updateStatus(id: string, data:any)
    {
        return this._networkService.post(`${URI.SERVICEREQUESTUBDATESTATUS}/${id}`, data);
    }
 



  
}
