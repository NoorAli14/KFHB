import { forkJoin, Observable } from 'rxjs';
import { NetworkService } from './../../shared/services/network/network.service';
import { Injectable } from '@angular/core';
import { URI } from '@shared/constants/app.constants';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private network: NetworkService) {
        
    }
    getCustomers(queryParams): Observable<any>{
        return this.network.getAll(`${URI.CUSTOMERS}?${queryParams}`);
    }
    getCustomerById(id): Observable<any>{
        return this.network.getAll(`${URI.CUSTOMER360}/${id}`);
    }
    getCustomersScreenShots(id): Observable<any>{
        return this.network.getAll(`${URI.CUSTOMER360}/${id}/attachments`);
    }
    forkCustomer360(id){
        return forkJoin([
            this.getCustomerById(id),
            this.getCustomersScreenShots(id)
        ]);
    }
}
