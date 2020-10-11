import { BaseModel } from '@shared/models/base.model';
import { Modules } from './modules.model';

export class Role extends BaseModel{
    name: string;
    description: string;
    permissions: Array<{id: string}> = [];
}
