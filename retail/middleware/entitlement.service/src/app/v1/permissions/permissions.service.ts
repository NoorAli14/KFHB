import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PermissionRepository} from "@core/repository/permission.repository";
import {KeyValInput} from "@common/inputs/key-val-input";
import {MESSAGES, STATUS} from "@common/constants";

@Injectable()
export class PermissionService {
  constructor(private permissionDB: PermissionRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.permissionDB.list(keys,{"status" : STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    const result = await this.permissionDB.findOne({ id: id }, keys);
    if(!result){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: MESSAGES.NOT_FOUND,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async findPermissionsByModuleID(moduleIds): Promise<any>{
    const permissions = await this.permissionDB.listPermissionsByModuleID(moduleIds);
    const permissionLookUps = {};
    permissions.forEach(permission => {
      if (!permissionLookUps[permission.module_id]) {
        permissionLookUps[permission.module_id] = permission || {};
      }
    });
    return moduleIds.map(id => {
      if(permissionLookUps[id]){
        return permissionLookUps[id];
      } else {
        return {}
      }
    });
  }

  async findByProperty(checks: KeyValInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    const result = await this.permissionDB.findBy(conditions, keys);
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
    permissionObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const result = await this.permissionDB.update({ id: id }, permissionObj, keys);
    if(result && result.length) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async create(permissionObj: Record<string, any>, keys?: string[]): Promise<any> {
    if(!permissionObj.status){
      permissionObj.status = STATUS.PENDING;
    }
    const result = await this.permissionDB.create(permissionObj, keys);
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
