import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { NetworkService } from '@shared/services/network/network.service';

@Injectable({
    providedIn: 'root',
})
export class ReferralService {
    modules: Array<any> = [];
    constructor(private _networkService: NetworkService) { }
    getTransactions() {
        return this._networkService.getAll(URI.REFERRALTRANSACTIONS);
    }
    getTransactionsReport(){
        return this._networkService.getAll(URI.TRANSACTIONSREPORT);
    }
    // forkUserData() {
    //     return forkJoin([this.getUsers(), this.getRoles(),this._refService.getCountries()]);
    // }
    // mapModules(modules) {
    //     this.modules = [];
    //     this.makeFlat(modules, '');
    //     return this.modules;
    // }
}
