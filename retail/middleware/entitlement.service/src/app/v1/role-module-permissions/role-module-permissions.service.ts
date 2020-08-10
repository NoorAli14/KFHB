import { Injectable } from '@nestjs/common';
import {RoleModulePermissionRepository} from "@core/repository/role-module-permission.repository";
import {STATUS} from "@common/constants";

@Injectable()
export class RoleModulePermissionsService {
  constructor(private roleModulePermissionsDB: RoleModulePermissionRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.roleModulePermissionsDB.list(keys,{"status":"ACTIVE"});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.roleModulePermissionsDB.findOne({ id: id }, keys);
  }

  async update(
    id: string,
    roleModulePermissionObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const [roleModulePermission] = await this.roleModulePermissionsDB.update({ id: id }, roleModulePermissionObj, keys);
    return roleModulePermission;
  }

  async create(roleModulePermissionObj: Record<string, any>, keys?: string[]): Promise<any> {
    roleModulePermissionObj.status = STATUS.ACTIVE;
    const [roleModulePermission] = await this.roleModulePermissionsDB.create(roleModulePermissionObj, keys);
    return roleModulePermission;
  }

  async delete(id: string): Promise<any> {
    return await this.roleModulePermissionsDB.delete({ id: id });
  }
}
