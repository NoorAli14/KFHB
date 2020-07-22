import { Injectable } from '@nestjs/common';
import {PermissionRepository} from "@core/repository/permission.repository";

@Injectable()
export class PermissionService {
  constructor(private permissionDB: PermissionRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.permissionDB.list(keys);
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.permissionDB.findOne({ id: id }, keys);
  }

  async update(
    id: string,
    permissionObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const [permission] = await this.permissionDB.update({ id: id }, permissionObj, keys);
    return permission;
  }

  async create(permissionObj: Record<string, any>, keys?: string[]): Promise<any> {
    const [permission] = await this.permissionDB.create(permissionObj, keys);
    return permission;
  }

  async delete(id: string): Promise<any> {
    return await this.permissionDB.delete({ id: id });
  }
}
