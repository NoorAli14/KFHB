import { Injectable } from '@nestjs/common';
import {RoleRepository} from "@core/repository/role.repository";

@Injectable()
export class RoleService {
  constructor(private roleDB: RoleRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.roleDB.list(keys,{"status":"ACTIVE"});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.roleDB.findOne({ id: id }, keys);
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
    const [role] = await this.roleDB.create(newRole, keys);
    return role;
  }

  async delete(id: string): Promise<any> {
    return await this.roleDB.delete({ id: id });
  }
}
