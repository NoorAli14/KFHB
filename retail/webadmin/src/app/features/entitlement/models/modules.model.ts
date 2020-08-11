import { Permission } from "./config.model";
import { BaseModel } from '@shared/models/base.model';

export class Modules extends BaseModel {
    name: string;
    parent: string;
    permissions: Array<Permission> = [];
}
