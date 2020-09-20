import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {RoleRepository} from "@core/repository/role.repository";
import {MESSAGES, STATUS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";

@Injectable()
export class RoleService {
  constructor(private roleDB: RoleRepository) {}

  async list(keys: string[], paginationParams: Record<string, any>): Promise<any> {
    return this.roleDB.listWithPagination(paginationParams, keys);
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
    if (roleObj.name && await this.isNameTaken(roleObj)) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.ROLE_EXISTS,
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
    await this.isNameTaken(newRole);
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

  async delete(id: string, input: Record<any, any>): Promise<any> {
    const result = await this.update(id, input, ['id']);
    return !!result;
  }

  async isNameTaken(role: Record<any, any>): Promise<any> {
    const checks: KeyValInput[] = [
      {
        record_key:"name",
        record_value: role.name
      }];
    if (role.tenant_id){
      checks.push({
        record_key: "tenant_id",
        record_value: role.tenant_id
      })
    }
    const role_a = await this.findByProperty(checks, ['id', 'name']);
    return role_a.length && role_a.length > 0;
  }
}
