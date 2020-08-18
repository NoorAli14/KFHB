import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ModuleRepository} from "@core/repository/module.repository";
import {MESSAGES, STATUS} from "@common/constants";
import {KeyValInput} from "@common/inputs/key-val-input";

@Injectable()
export class ModuleService {
  constructor(private moduleDB: ModuleRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.moduleDB.list(keys,{"status":STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    const result = await this.moduleDB.findOne({ id: id }, keys);
    if(!result){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: MESSAGES.NOT_FOUND,
      }, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async findModulesByRoleID(roleIds): Promise<any>{
    const modules = await this.moduleDB.listModulesByRoleID(roleIds);
    const moduleLookUps = {};
    modules.forEach(module => {
      if (!moduleLookUps[module.role_id]) {
        moduleLookUps[module.role_id] = module || {};
      }
    });
    return roleIds.map(id => {
      if(moduleLookUps[id]){
        return moduleLookUps[id];
      } else {
        return {}
      }
    });
  }

  async findModulesByParentModuleID(parentIds): Promise<any>{
    const modules = await this.moduleDB.listModulesByParentModuleID(parentIds);
    const moduleLookUps = {};
    modules.forEach(module => {
      if (!moduleLookUps[module.parent_id]) {
        moduleLookUps[module.parent_id] = module || {};
      }
    });
    return parentIds.map(id => {
      if(moduleLookUps[id]){
        return moduleLookUps[id];
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
    const result = await this.moduleDB.findBy(conditions, keys);
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
    moduleObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const result = await this.moduleDB.update({ id: id }, moduleObj, keys);
    if(result && result.length) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async create(newModule: Record<string, any>, keys?: string[]): Promise<any> {
    if(!newModule.status){
      newModule.status = STATUS.PENDING;
    }
    const result = await this.moduleDB.create(newModule, keys);
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
