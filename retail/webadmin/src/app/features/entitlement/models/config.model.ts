import { BaseModel } from '@shared/models/base.model';

export class RoleModuleModel{
    id:string;
    roleId:string;
    moduleId:string;
}
export class RoleModulePermission{
    roleModuleId:string;
    permissionId:string;
}
export class Permission extends BaseModel{
    name:string;
}