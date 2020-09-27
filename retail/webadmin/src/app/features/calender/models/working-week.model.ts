import { BaseModel } from '@shared/models/base.model';

export class WorkingDay extends BaseModel{
    weekday:string;
    startTime:string;
    endTime:string;
    fullDay:boolean;
    remarks:string;
    description:string;
    status:string;
}