import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import {MESSAGES, STATUS, WEEK_DAYS} from "@common/constants";
import { KeyValInput } from "@common/inputs/key-val.input";
import { WorkingDaysRepository } from "@core/repository";
import {WorkingDayInput} from '@app/v1/working-days/working-day.dto';
import {ICurrentUser} from '@common/interfaces';
import {WorkingDay} from '@app/v1/working-days/working-day.model';
import {ICreateWorkingDayInput} from '@app/v1/working-days/working-day.interface';
import {
  WorkingDayAlreadyExistException,
  WorkingDayStartTimeLessThanEndTimeException
} from '@app/v1/working-days/exceptions';
import {WorkingDayStartEndTimeInvalidRange} from '@app/v1/working-days/exceptions/working-day-start-end-time-invalid-range';

@Injectable()
export class WorkingDaysService {
  constructor(private workingDaysRepository: WorkingDaysRepository) {}

  async list(current_user: ICurrentUser, keys: string[], paginationParams: Record<string, any>): Promise<any> {
    return this.workingDaysRepository.listWithPagination(paginationParams, keys,{deleted_on : null, tenant_id: current_user.tenant_id});
  }

  async findById(current_user: ICurrentUser, id: string, keys?: string[]): Promise<any> {
    return this.workingDaysRepository.findOne({ id: id, deleted_on : null, tenant_id: current_user.tenant_id }, keys);
  }

  async findByProperty(current_user: ICurrentUser, checks: KeyValInput[], keys?: string[]): Promise<any> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    conditions['tenant_id'] = current_user.tenant_id;
    conditions['deleted_on'] = null;
    return this.workingDaysRepository.findBy(conditions, keys);
  }

  async findByDuration(obj: Record<string, any>, keys?: string[]): Promise<WorkingDay[]> {
    return this.workingDaysRepository.findByDuration(obj, keys);
  }

  async update(
    current_user: ICurrentUser,
    id: string,
    input: WorkingDayInput,
    output?: string[],
  ): Promise<WorkingDay> {
    const [workingDay] = await this.findByWeekday(current_user, input.week_day);
    if (workingDay && workingDay.id != id) throw new WorkingDayAlreadyExistException(workingDay.id);
    if(input.full_day) {
      input.start_time_local = '0000';
      input.end_time_local = '2359';
    } else {
      input.start_time_local = input.start_time_local || workingDay?.start_time_local;
      input.end_time_local = input.end_time_local || workingDay?.end_time_local;
    }
    if (input.start_time_local > input.end_time_local){
      throw new WorkingDayStartTimeLessThanEndTimeException(id, input.start_time_local, input.end_time_local)
    }
    if ((input.start_time_local < '0000' || input.start_time_local > '2359') || (input.end_time_local < '0000' || input.end_time_local > '2359')){
      throw new WorkingDayStartEndTimeInvalidRange(null, input.start_time_local, input.end_time_local)
    }
    const [result] = await this.workingDaysRepository.update({
      id: id,
      deleted_on : null,
      tenant_id: current_user.tenant_id
    }, {...input, ...{updated_by: current_user.id}}, output);
    return result;
  }

  async create(current_user: ICurrentUser, newObj: WorkingDayInput, output?: string[]): Promise<WorkingDay> {
    const workingDay = await this.findByWeekday(current_user, newObj.week_day);
    if (workingDay?.length > 0) throw new WorkingDayAlreadyExistException(workingDay[0].id);
    if(newObj.full_day) {
      newObj.start_time_local = '0000';
      newObj.end_time_local = '2359';
    }
    if (newObj.start_time_local > newObj.end_time_local){
      throw new WorkingDayStartTimeLessThanEndTimeException(null, newObj.start_time_local, newObj.end_time_local)
    }
    if ((newObj.start_time_local < '0000' || newObj.start_time_local > '2359') || (newObj.end_time_local < '0000' || newObj.end_time_local > '2359')){
      throw new WorkingDayStartEndTimeInvalidRange(null, newObj.start_time_local, newObj.end_time_local)
    }
    const input: ICreateWorkingDayInput = {...newObj, ...{
        tenant_id: current_user.tenant_id,
        created_by: current_user.id,
        updated_by: current_user.id,
    }};
    const result = await this.workingDaysRepository.create(input, output);
    if(result?.length > 0) return result[0];
    throw new HttpException({
      status: HttpStatus.BAD_REQUEST,
      error: MESSAGES.BAD_REQUEST,
    }, HttpStatus.BAD_REQUEST);
  }

  async delete(current_user: ICurrentUser, id: string): Promise<boolean> {
    const result = await this.workingDaysRepository.markAsDelete(current_user.tenant_id, current_user.id, id);
    return !!result;
  }

  async findByWeekday(current_user: ICurrentUser, week_day: string): Promise<WorkingDay[]> {
    const checks: KeyValInput[] = [
      {
        record_key:"week_day",
        record_value: week_day
      }
    ];
    return this.findByProperty(current_user, checks, ['id', 'week_day', 'start_time_local', 'end_time_local']);
  }
}
