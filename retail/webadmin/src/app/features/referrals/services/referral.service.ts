import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { RetailNetworkService } from '@shared/services/network/retail-network.service';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ReferralService {
    constructor(private _RetailNetworkService: RetailNetworkService) { }
    getTransactions(): Observable<any> {
        return this._RetailNetworkService.getAll(environment.API_BASE_URL_2, URI.REFERRAL_TRANSACTIONS);
    }
    getTransactionsReport(): Observable<any> {
        return this._RetailNetworkService.getAll(environment.API_BASE_URL_2, URI.REFERRAL_TRANSACTIONS_REPORT);
    }
}
