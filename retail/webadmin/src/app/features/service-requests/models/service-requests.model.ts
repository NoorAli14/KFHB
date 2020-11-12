import { BaseModel } from '@shared/models/base.model';

export class ServiceRequests extends BaseModel {
    id: string;
    accountType?: string;
    customerRim?: string;
    customerEmail?: string;
    customerMobile?: string;
    date?: Date;
    status: string;
    comments?: string;
    letterType?: string;
    requestType?: string;
    completionLetterType?: any;
    result?: [{
        form_id: string;
        option_id: string;
        result: string;
        rule: { required: boolean, isPastDate: boolean, nullable: boolean }
        status: string;
        title: string;
        title_ar: string;
    }];
    result2?: {
        type: string;
        new: string;
        old: string;
    };
    documents: [{

    }];
}
