import { Injectable } from '@nestjs/common';
import {RoleRepository} from "@core/repository/role.repository";
import {STATUS} from "@common/constants";
import {KeyValInput} from "@common/inputs/key-val-input";

@Injectable()
export class RoleService {
  constructor(private roleDB: RoleRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.roleDB.list(keys,{"status" : STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.roleDB.findOne({ id: id }, keys);
  }

  async findByProperty(checks: KeyValInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    return this.roleDB.findBy(conditions, keys);
  }

  async findRolesByUserID(userIds): Promise<any>{
    return this.roleDB.listRolesByUserID(userIds);
  }

  async update(
    id: string,
    roleObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const [role] = await this.roleDB.update({ id: id }, roleObj, keys);
    return role;
  }

  async create(newRole: Record<string, any>, keys?: string[]): Promise<any> {
    newRole.status = STATUS.ACTIVE;
    const [role] = await this.roleDB.create(newRole, keys);
    return role;
  }

  async delete(id: string): Promise<any> {
    return await this.roleDB.delete({ id: id });
  }
}
