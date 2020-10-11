import { BaseModel } from '@shared/models/base.model';

export class Holiday extends BaseModel{
    holidayDate: string;
    description: string;
    remarks: string;
    status: string;
}
