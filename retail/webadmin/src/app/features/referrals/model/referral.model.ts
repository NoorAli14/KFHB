import { BaseModel } from '@shared/models/base.model';

export class Referral extends BaseModel {
    nameOfReferringCustomer: string;
    nameOfReferredCustomer: string;
    referringCustomerEmail: string;
    referringCustomerMobileNo: string;
    rimOfReferringCustomer: string;
    dateOfAccountOpening: string;
    referredCustomerEmail: string;
    referredCustomerMobileNo: string;
    rimOfReferredCustomer: string;
    dateOfJazeelRegistration: string;
    customerOpenedAccount: boolean;
}








