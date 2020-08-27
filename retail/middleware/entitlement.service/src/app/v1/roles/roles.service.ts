import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {RoleRepository} from "@core/repository/role.repository";
import {MESSAGES, STATUS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";

@Injectable()
export class RoleService {
  constructor(private roleDB: RoleRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.roleDB.list(keys,{"deleted_on" : null});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    const result = await this.roleDB.findOne({ id: id }, keys);
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
    const result = await this.roleDB.findBy(conditions, keys);
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
    roleObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    if(roleObj.status && !STATUS[roleObj.status]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_STATUS,
      }, HttpStatus.BAD_REQUEST);
    }
    const result = await this.roleDB.update({ id: id }, roleObj, keys);
    if(result?.length > 0) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async create(newRole: Record<string, any>, keys?: string[]): Promise<any> {
    if(!newRole.status){
      newRole.status = STATUS.ACTIVE;
    } else if(!STATUS[newRole.status]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_STATUS,
      }, HttpStatus.BAD_REQUEST);
    }
    const result = await this.roleDB.create(newRole, keys);
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
    const result = await this.update(id, {status: STATUS.INACTIVE});
    return !!result;
  }
}
