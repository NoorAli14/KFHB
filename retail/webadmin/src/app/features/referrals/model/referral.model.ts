import { BaseModel } from '@shared/models/base.model';

export class Referral extends BaseModel {
    'requestType': string;
    'nameOfReferringCustomer': string;
    'referringCustomerEmail': string;
    'referringCustomerMobileNo​': boolean;
    'rimOfReferringCustomer​': string;
    'dateOfAccountOpening​': string;
    'referredCustomerEmail': string;
    'referredCustomerMobileNo​': string;
    'rimOfReferredCustomer​': string;
}
