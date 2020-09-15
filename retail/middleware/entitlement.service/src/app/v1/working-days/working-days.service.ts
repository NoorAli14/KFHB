import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import {MESSAGES, STATUS, WEEK_DAYS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";
import { WorkingDaysRepository } from "@core/repository";

@Injectable()
export class WorkingDaysService {
  constructor(private workingDaysRepository: WorkingDaysRepository) {}

  async list(keys: string[], paginationParams: Record<string, any>): Promise<any> {
    return this.workingDaysRepository.listWithPagination(paginationParams, keys,{deleted_on : null});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.workingDaysRepository.findOne({ id: id, deleted_on : null }, keys);
  }

  async findByProperty(checks: KeyValInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    conditions['deleted_on'] = null;
    return this.workingDaysRepository.findBy(conditions, keys);
  }

  async findByDuration(obj: Record<string, any>, keys?: string[]): Promise<any> {
    return this.workingDaysRepository.findByDuration(obj, keys);
  }

  async update(
    id: string,
    newObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    if(newObj.status && !STATUS[newObj.status]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_STATUS,
      }, HttpStatus.BAD_REQUEST);
    }
    if(newObj.week_day && !WEEK_DAYS[newObj.week_day]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_WEEKDAY,
      }, HttpStatus.BAD_REQUEST);
    }
    if(newObj.full_day) {
      newObj.start_time = newObj.end_time = null
    } else if (newObj.start_time && newObj.end_time){
      newObj.start_time = new Date(newObj.start_time);
      newObj.end_time = new Date(newObj.end_time);
      newObj.full_day = null;
      if(!newObj.start_time || !newObj.start_time){
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGES.BAD_TIME_FORMAT,
        }, HttpStatus.BAD_REQUEST);
      }
    }
    if (newObj.week_day && await this.doesWeekdayExist(newObj)){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.WEEK_DAY_EXISTS,
      }, HttpStatus.BAD_REQUEST);
    }
    const [result] = await this.workingDaysRepository.update({ id: id, deleted_on : null }, newObj, keys);
    if(!result) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.BAD_REQUEST,
      }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async create(newObj: Record<string, any>, keys?: string[]): Promise<any> {
    if(!newObj.status){
      newObj.status = STATUS.ACTIVE;
    } else if(!STATUS[newObj.status]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_STATUS,
      }, HttpStatus.BAD_REQUEST);
    }
    if(!WEEK_DAYS[newObj.week_day]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_WEEKDAY,
      }, HttpStatus.BAD_REQUEST);
    }
    if(newObj.full_day) {
      newObj.start_time = newObj.end_time = null
    } else {
      newObj.start_time = new Date(newObj.start_time);
      newObj.end_time = new Date(newObj.end_time);
      newObj.full_day = null;
      if(!newObj.start_time || !newObj.start_time){
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGES.BAD_TIME_FORMAT,
        }, HttpStatus.BAD_REQUEST);
      }
    }
    if (await this.doesWeekdayExist(newObj)){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.WEEK_DAY_EXISTS,
      }, HttpStatus.BAD_REQUEST);
    }
    const result = await this.workingDaysRepository.create(newObj, keys);
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

  async doesWeekdayExist(obj: Record<any, any>): Promise<boolean> {
    const checks: KeyValInput[] = [
      {
        record_key:"week_day",
        record_value: obj.week_day
      }];
    const weekDay = await this.findByProperty(checks, ['id', 'week_day']);
    return weekDay.length && weekDay.length > 0;
  }
}
