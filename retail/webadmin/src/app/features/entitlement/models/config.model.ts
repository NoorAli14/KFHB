import { BaseModel } from '@shared/models/base.model';

export class Permission extends BaseModel{
    name: string;
    recordType: string;
}
