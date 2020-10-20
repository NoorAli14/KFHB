import { NetworkService } from './../../shared/services/network/network.service';
import { Injectable } from '@angular/core';
import { URI } from '@shared/constants/app.constants';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private network:NetworkService) {
        
    }
    getCustomers(pageIndex,perPage){
        return this.network.getAll(URI.CUSTOMERS);
    }
    getCustomerById(id){
        return this.network.getAll(`${URI.CUSTOMER360}/${id}`);
    }
}