import { BaseModel } from '@shared/models/base.model';

export class ServiceRequests extends BaseModel{
    id: string;
    type: string;
    customerRim: string;
    customerEmail: string;
    customerMobile: string;
    date: Date;
    status: string;
}
