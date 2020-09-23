import { BaseModel } from "@shared/models/base.model";

export class Leave extends BaseModel {
    startDate: string;
    endDate: string;
    remarks: string;
    leaveTypeId: string;
    userId: string;
    status: string;
}
