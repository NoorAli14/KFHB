import { Injectable } from '@angular/core';
import { URI } from '@shared/constants/app.constants';
import { RubixNetworkService } from '@shared/services/rubix-network/rubix-network.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SystemManagementService {
    constructor(private _networkService: RubixNetworkService) {}
 
    getAuditLogs(queryParams): Observable<any> {
        return this._networkService.getAll(`${URI.SYSTEM_AUDIT}?${queryParams}`);
    }
    getUsers(queryParams?): Observable<any> {
        return this._networkService.getAll(`${URI.USER}?${queryParams}`);
    }
}