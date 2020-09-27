import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {ModuleRepository} from "@core/repository/module.repository";
import {MESSAGES, STATUS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";

@Injectable()
export class ModuleService {
  constructor(private moduleDB: ModuleRepository) {}

  async list(output: string[], paginationParams: Record<string, any>): Promise<any> {
    return this.moduleDB.listWithPagination(paginationParams, output, {parent_id: null});
  }

  async findById(id: string, output?: string[]): Promise<any> {
    return await this.moduleDB.findOne({ id: id }, output);
  }

  async findByProperty(checks: KeyValInput[], output?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    return this.moduleDB.findBy(conditions, output);
  }

  async update(
    id: string,
    moduleObj: Record<string, any>,
    output?: string[],
  ): Promise<any> {
    if(moduleObj.status && !STATUS[moduleObj.status]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_STATUS,
      }, HttpStatus.BAD_REQUEST);
    }
    const [result] = await this.moduleDB.update({ id: id }, moduleObj, output);
    if(!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async create(newModule: Record<string, any>, output?: string[]): Promise<any> {
    if(!newModule.status){
      newModule.status = STATUS.ACTIVE;
    } else if(!STATUS[newModule.status]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_STATUS,
      }, HttpStatus.BAD_REQUEST);
    }
    const result = await this.moduleDB.create(newModule, output);
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
    return await this.moduleDB.delete({ id: id });
  }
}
