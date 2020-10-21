import { BaseModel } from '@shared/models/base.model';

export class Referral extends BaseModel {
    nameOfReferringCustomer: string;
    nameOfReferredCustomer: string;
    referringCustomerEmail: string;
    referringCustomerMobileNo: boolean;
    rimOfReferringCustomer: string;
    dateOfAccountOpening: string;
    referredCustomerEmail: string;
    referredCustomerMobileNo: string;
    rimOfReferredCustomer: string;
    dateOfJazeelRegistration: string;
    customerOpenedAccount: string;
}








