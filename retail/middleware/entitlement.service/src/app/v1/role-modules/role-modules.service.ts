import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {RoleModuleRepository} from "@core/repository/role-module.repository";
import {MESSAGES, STATUS} from "@common/constants";
import {KeyValInput} from "@common/inputs/key-val-input";

@Injectable()
export class RoleModulesService {
  constructor(private roleModulesDB: RoleModuleRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.roleModulesDB.list(keys,{"status":STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    const result = await this.roleModulesDB.findOne({ id: id }, keys);
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
    const result = await this.roleModulesDB.findBy(conditions, keys);
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
    roleModuleObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const result = await this.roleModulesDB.update({ id: id }, roleModuleObj, keys);
    if(result && result.length) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async create(newRoleModule: Record<string, any>, keys?: string[]): Promise<any> {
    if(!newRoleModule.status){
      newRoleModule.status = STATUS.PENDING;
    }
    const result = await this.roleModulesDB.create(newRoleModule, keys);
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
