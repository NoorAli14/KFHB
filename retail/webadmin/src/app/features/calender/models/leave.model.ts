import { BaseModel } from "@shared/models/base.model";

export class Leave extends BaseModel {
    leaveType: string;
    status: string;
}
