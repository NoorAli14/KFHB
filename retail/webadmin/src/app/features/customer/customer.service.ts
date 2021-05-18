import { forkJoin, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { URI } from '@shared/constants/app.constants';
import { RubixNetworkService } from '@shared/services/rubix-network/rubix-network.service';
import { CorporateNetworkService } from '@shared/services/corporate-network/corporate-network.service';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private network: RubixNetworkService, private cobNetwork: CorporateNetworkService) {
        
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
    updateCustomer(id,model): Observable<any>{
        return this.network.onUpdate(`${URI.CUSTOMER360}/${id}`,model);
    }
    updateGuardian(id,model): Observable<any>{
        return this.network.onUpdate(`${URI.CUSTOMER360}/${id}/guardian`,model);
    }
    createAccount(id): Observable<any>{
        return this.network.post(`${URI.CUSTOMER360}/${id}/account`,{});
    }
    getCRSTemplate(): Observable<any>{
        return this.network.getAll(`${URI.COMPLIANCE_CRS}`,{});
    }
    getAMLData(id): Observable<any>{
        return this.network.post(`${URI.AML}screening?customer_id=${id}`,{});
    }
  
    forkCustomer360(id){
        return forkJoin([
            this.getCustomerById(id),
            this.getCustomersScreenShots(id)
        ]);
    }
    getCompanyDetail(id): Observable<any>{
        return this.cobNetwork.getAll(`${URI.COMPANY_DETAIL}/${id}`);
    }
    getMemberDetails(id): Observable<any>{
        return this.cobNetwork.getAll(`${URI.MEMBER_DETAIL}/${id}`);
    }
    getCorporateCustomerData(entityId,entityMemberId){
        return forkJoin([
            this.getCompanyDetail(entityId),
            this.getMemberDetails(entityMemberId)
        ]);
    }
    async updateCorporateMember(id,model): Promise<any>{
        return this.cobNetwork.onUpdate(`${URI.UPDATE_MEMBER}/${id}`,model).toPromise();
    }
}
