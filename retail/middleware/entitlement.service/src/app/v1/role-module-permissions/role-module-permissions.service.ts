import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {RoleModulePermissionRepository} from "@core/repository/role-module-permission.repository";
import {MESSAGES, STATUS} from "@common/constants";
import {KeyValInput} from "@common/inputs/key-val-input";

@Injectable()
export class RoleModulePermissionsService {
  constructor(private roleModulePermissionsDB: RoleModulePermissionRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.roleModulePermissionsDB.list(keys,{"status":STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    const result = await this.roleModulePermissionsDB.findOne({ id: id }, keys);
    if(!result){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: MESSAGES.NOT_FOUND,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async findByProperty(checks: KeyValInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    const result = await this.roleModulePermissionsDB.findBy(conditions, keys);
    if(!result){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: MESSAGES.NOT_FOUND,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async update(
    id: string,
    roleModulePermissionObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const result = await this.roleModulePermissionsDB.update({ id: id }, roleModulePermissionObj, keys);
    if(result && result.length) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async create(roleModulePermissionObj: Record<string, any>, keys?: string[]): Promise<any> {
    if(!roleModulePermissionObj.status){
      roleModulePermissionObj.status = STATUS.PENDING;
    }
    const result = await this.roleModulePermissionsDB.create(roleModulePermissionObj, keys);
    if(result && result.length) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    const result = await this.update(id, {status: STATUS.INACTIVE});
    return !!result;
  }
}
