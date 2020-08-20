import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import {MESSAGES, STATUS, TABLE, WEEK_DAYS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";
import { WorkingDaysRepository } from "@core/repository";

@Injectable()
export class WorkingDaysService {
  constructor(private workingDaysRepository: WorkingDaysRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.workingDaysRepository.list(keys,{"status" : STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    const result = await this.workingDaysRepository.findOne({ id: id }, keys);
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
    const result = await this.workingDaysRepository.findBy(conditions, keys);
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
    newObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    if(newObj.week_day && !WEEK_DAYS[newObj.week_day]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_WEEKDAY,
      }, HttpStatus.BAD_REQUEST);
    }
    const result = await this.workingDaysRepository.update({ id: id }, newObj, keys);
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
    if(!WEEK_DAYS[newObj.week_day]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_WEEKDAY,
      }, HttpStatus.BAD_REQUEST);
    }
    const result = await this.workingDaysRepository.create(newObj, keys);
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
