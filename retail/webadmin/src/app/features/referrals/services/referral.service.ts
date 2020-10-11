import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { NetworkService } from '@shared/services/network/network.service';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ReferralService {
    constructor(private _networkService: NetworkService) { }
    getTransactions(): Observable<any> {
        return this._networkService.getAll(environment.API_BASE_URL_2, URI.REFERRAL_TRANSACTIONS);
    }
    getTransactionsReport(): Observable<any> {
        return this._networkService.getAll(environment.API_BASE_URL_2, URI.REFERRAL_TRANSACTIONS_REPORT);
    }
}
