import { BaseModel } from '@shared/models/base.model';

export class WorkingDay extends BaseModel{
    weekDay: string;
    startTimeLocal: string;
    endTimeLocal: string;
    fullDay: boolean;
    remarks: string;
    description: string;
    status: string;
}
