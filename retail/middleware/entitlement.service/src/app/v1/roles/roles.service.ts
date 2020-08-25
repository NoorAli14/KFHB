import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {RoleRepository} from "@core/repository/role.repository";
import {MESSAGES, STATUS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";

@Injectable()
export class RoleService {
  constructor(private roleDB: RoleRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.roleDB.list(keys,{"status" : STATUS.ACTIVE});
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

  async findRolesByUserID(userIds): Promise<any>{
    const roles = await this.roleDB.listRolesByUserID(userIds);
    const rolesLookups = {};
    roles.forEach(role => {
      if (!rolesLookups[role.user_id]) {
        rolesLookups[role.user_id] = role || {};
      }else{
        const prev = rolesLookups[role.user_id];
        if(Array.isArray(prev)) {
          rolesLookups[role.user_id] = [...prev, role]
        } else {
          rolesLookups[role.user_id] = [prev, role]
        }
      }
    });
    return userIds.map(id => {
      if(rolesLookups[id]){
        return rolesLookups[id];
      } else {
        return null
      }
    });
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
    if(result && result.length) {
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
