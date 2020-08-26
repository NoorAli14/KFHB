import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import { UserRoleRepository } from "@core/repository/user-role.repository";
import {MESSAGES, STATUS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";

@Injectable()
export class UserRolesService {
  constructor(private userRoleDB: UserRoleRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.userRoleDB.list(keys,{"status":STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    const result = await this.userRoleDB.findOne({ id: id }, keys);
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
    const result = await this.userRoleDB.findBy(conditions, keys);
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
      userRoleObj: Record<string, any>,
      keys?: string[],
  ): Promise<any> {
    const result = await this.userRoleDB.update({ id: id }, userRoleObj, keys);
    if(result && result.length) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async create(newUserRole: Record<string, any>, keys?: string[]): Promise<any> {
    if(!newUserRole.status){
      newUserRole.status = STATUS.PENDING;
    }
    const result = await this.userRoleDB.create(newUserRole, keys);
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
