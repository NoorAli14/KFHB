import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import {MESSAGES, STATUS, WEEK_DAYS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";
import {LeaveRepository} from "@core/repository/leave.repository";

@Injectable()
export class LeavesService {
  constructor(private leaveRepository: LeaveRepository) {}

  async list(keys: string[], paginationParams: Record<string, any>): Promise<any> {
    return this.leaveRepository.listWithPagination(paginationParams, keys,{"status" : STATUS.ACTIVE});
  }

  async findById(id: string, keys?: string[]): Promise<any> {
    return this.leaveRepository.findOne({ id: id }, keys);
  }

  async findByProperty(checks: KeyValInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    return this.leaveRepository.findBy(conditions, keys);
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
    if(newObj.calendar_day && !WEEK_DAYS[newObj.calendar_day]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_WEEKDAY,
      }, HttpStatus.BAD_REQUEST);
    }
    const [result] = await this.leaveRepository.update({ id: id }, newObj, keys);
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
    if(!WEEK_DAYS[newObj.calendar_day]){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: MESSAGES.INVALID_WEEKDAY,
      }, HttpStatus.BAD_REQUEST);
    }
    const result = await this.leaveRepository.create(newObj, keys);
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
