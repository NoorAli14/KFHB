import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { URI } from '@shared/constants/app.constants';
import { RetailNetworkService } from '@shared/services/network/retail-network.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FinanceService {

    constructor(private _networkService: RetailNetworkService) { }
    getApplications(model): Observable<any> {
        return this._networkService.postSafe(environment.API_BASE_URL, `${URI.FINANCE_APPLICATIONS}`,model);
    }
    getApplicationsById(model): Observable<any> {
        return this._networkService.postSafe(environment.API_BASE_URL, `${URI.FINANCE_APPLICATION}`,model);
    }

    getDocumentById(model): Observable<any> {
        return this._networkService.postSafe(environment.API_BASE_URL, `${URI.FINANCE_APPLICATION_DOCS}`,model);
    }
    postAction(model): Observable<any> {
        return this._networkService.postSafe(environment.API_BASE_URL, `${URI.FINANCE_APPLICATION_DOCS}`,model);
    }
}
