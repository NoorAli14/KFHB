import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import { MESSAGES, STATUS } from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val-input";
import {WorkingWeekRepository} from "@core/repository/working-week.repository";

@Injectable()
export class WorkingWeekService {
  constructor(private workingWeekRepository: WorkingWeekRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.workingWeekRepository.list(keys,{"status" : STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    const result = await this.workingWeekRepository.findOne({ id: id }, keys);
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
    const result = await this.workingWeekRepository.findBy(conditions, keys);
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
    userObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    const result = await this.workingWeekRepository.update({ id: id }, userObj, keys);
    if(result && result.length) {
      return result[0]
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async create(newObj: Record<string, any>, keys?: string[]): Promise<any> {
    if(!newObj.status){
      newObj.status = STATUS.PENDING;
    }
    const result = await this.workingWeekRepository.create(newObj, keys);
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
