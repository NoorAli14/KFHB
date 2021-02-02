import { Injectable } from '@angular/core';
import { URI } from '@shared/constants/app.constants';
import { RubixNetworkService } from '@shared/services/rubix-network/rubix-network.service.ts';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SystemManagementService {
    constructor(private _RubixNetworkService: RubixNetworkService) {}
 
    getAuditLogs(queryParams): Observable<any> {
        return this._RubixNetworkService.getAll(`${URI.SYSTEM_AUDIT}?${queryParams}`);
    }
    getUsers(queryParams?): Observable<any> {
        return this._RubixNetworkService.getAll(`${URI.USER}?${queryParams}`);
    }
}