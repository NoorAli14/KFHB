import { Injectable } from '@nestjs/common';
import {UserRoleRepository} from "@core/repository/user-role.repository";

@Injectable()
export class UserRolesService {
  constructor(private userRoleDB: UserRoleRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.userRoleDB.list(keys,{"status":"ACTIVE"});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.userRoleDB.findOne({ id: id }, keys);
  }

  async create(newUserRole: Record<string, any>, keys?: string[]): Promise<any> {
    const [userRole] = await this.userRoleDB.create(newUserRole, keys);
    return userRole;
  }

  async delete(id: string): Promise<any> {
    return await this.userRoleDB.delete({ id: id });
  }
}
