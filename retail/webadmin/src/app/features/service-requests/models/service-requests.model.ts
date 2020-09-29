import { BaseModel } from '@shared/models/base.model';

export class ServiceRequests extends BaseModel{
    id: string;
    type: string;
    customer_rim: string;
    customer_email: string;
    customer_mobile: string;
    date: Date;
    status: string;
}
