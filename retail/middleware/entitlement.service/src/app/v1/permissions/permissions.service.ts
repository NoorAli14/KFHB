import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {PermissionRepository} from "@core/repository/permission.repository";
import { KeyValInput } from "@common/inputs/key-val.input";
import {MESSAGES} from "@common/constants";

@Injectable()
export class PermissionService {
  constructor(private permissionDB: PermissionRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.permissionDB.list(keys);
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.permissionDB.findOne({ id: id }, keys);
  }

  async findByProperty(checks: KeyValInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    return this.permissionDB.findBy(conditions, keys);
  }

  async update(
    id: string,
    permissionObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const [result] = await this.permissionDB.update({ id: id }, permissionObj, keys);
    if(!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async create(permissionObj: Record<string, any>, keys?: string[]): Promise<any> {
    const result = await this.permissionDB.create(permissionObj, keys);
    if(result?.length > 0) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    return await this.permissionDB.delete({ id: id });
  }
}
