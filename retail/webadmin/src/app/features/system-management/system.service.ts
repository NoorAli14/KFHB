import { Injectable } from '@angular/core';
import { URI } from '@shared/constants/app.constants';
import { NetworkService } from '@shared/services/network/network.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SystemManagementService {
    constructor(private _networkService: NetworkService) {}
 
    getAuditLogs(queryParams): Observable<any> {
        return this._networkService.getAll(`${URI.SYSTEM_AUDIT}?${queryParams}`);
    }
}