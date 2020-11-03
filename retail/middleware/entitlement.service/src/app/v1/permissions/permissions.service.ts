import { Injectable } from '@nestjs/common';

import { PermissionRepository } from '@core/repository/permission.repository';
import { KeyValInput } from '@common/inputs/key-val.input';
import { Permission } from './permission.model';

@Injectable()
export class PermissionService {
  constructor(private permissionDB: PermissionRepository) {}

  async list(output: string[]): Promise<any> {
    return this.permissionDB.listWithoutPagination(output);
  }

  async findById(id: string, output?: string[]): Promise<Permission> {
    return this.permissionDB.findOne({ id: id }, output);
  }

  async findByProperty(
    checks: KeyValInput[],
    output?: string[],
  ): Promise<Permission[]> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    return this.permissionDB.findBy(conditions, output);
  }

  async update(
    id: string,
    permissionObj: Record<string, any>,
    output?: string[],
  ): Promise<Permission> {
    const [result] = await this.permissionDB.update(
      { id: id },
      permissionObj,
      output,
    );
    return result;
  }

  async create(
    permissionObj: Record<string, any>,
    output?: string[],
  ): Promise<Permission> {
    const [result] = await this.permissionDB.create(permissionObj, output);
    return result;
  }

  async delete(id: string): Promise<any> {
    return this.permissionDB.delete({ id: id });
  }
}
