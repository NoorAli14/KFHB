import { Injectable } from '@nestjs/common';
import {RoleModuleRepository} from "@core/repository/role-module.repository";

@Injectable()
export class RoleModulesService {
  constructor(private roleModulesDB: RoleModuleRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.roleModulesDB.list(keys,{"status":"ACTIVE"});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.roleModulesDB.findOne({ id: id }, keys);
  }

  async update(
    id: string,
    roleModuleObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const [roleModule] = await this.roleModulesDB.update({ id: id }, roleModuleObj, keys);
    return roleModule;
  }

  async create(newRoleModule: Record<string, any>, keys?: string[]): Promise<any> {
    const [roleModule] = await this.roleModulesDB.create(newRoleModule, keys);
    return roleModule;
  }

  async delete(id: string): Promise<any> {
    return await this.roleModulesDB.delete({ id: id });
  }
}
