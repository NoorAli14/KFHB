import { Injectable } from '@nestjs/common';

import { KeyValInput } from '@common/inputs/key-val.input';
import { WorkingDaysRepository } from '@core/repository';
import { WorkingDayInput } from '@app/v1/working-days/working-day.dto';
import { ICurrentUser } from '@common/interfaces';
import { WorkingDay } from '@app/v1/working-days/working-day.model';
import { ICreateWorkingDayInput } from '@app/v1/working-days/working-day.interface';
import {
  WorkingDayAlreadyExistException,
  WorkingDayStartTimeLessThanEndTimeException,
} from '@app/v1/working-days/exceptions';
import { WorkingDayStartEndTimeInvalidRange } from '@app/v1/working-days/exceptions/working-day-start-end-time-invalid-range';
import * as moment from 'moment';
import { STATUS, WEEK_DAYS } from '@common/constants';

@Injectable()
export class WorkingDaysService {
  constructor(private workingDaysRepository: WorkingDaysRepository) {}

  async list(
    current_user: ICurrentUser,
    output: string[],
  ): Promise<WorkingDay[]> {
    return this.workingDaysRepository.listWithoutPagination(output, {
      deleted_on: null,
      tenant_id: current_user.tenant_id,
    });
  }

  async findById(
    current_user: ICurrentUser,
    id: string,
    output?: string[],
  ): Promise<WorkingDay> {
    return this.workingDaysRepository.findOne(
      { id: id, deleted_on: null, tenant_id: current_user.tenant_id },
      output,
    );
  }

  async findByProperty(
    current_user: ICurrentUser,
    checks: KeyValInput[],
    output?: string[],
  ): Promise<WorkingDay[]> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    conditions['tenant_id'] = current_user.tenant_id;
    conditions['deleted_on'] = null;
    return this.workingDaysRepository.findBy(conditions, output);
  }

  async update(
    current_user: ICurrentUser,
    id: string,
    input: WorkingDayInput,
    output?: string[],
  ): Promise<WorkingDay> {
    const [workingDay] = await this.findByWeekday(current_user, input.week_day);
    if (workingDay && workingDay.id != id)
      throw new WorkingDayAlreadyExistException(workingDay.id);
    if (input.full_day) {
      input.start_time_local = '0000';
      input.end_time_local = '2359';
    } else {
      input.start_time_local =
        input.start_time_local || workingDay?.start_time_local;
      input.end_time_local = input.end_time_local || workingDay?.end_time_local;
    }
    if (input.start_time_local > input.end_time_local) {
      throw new WorkingDayStartTimeLessThanEndTimeException(
        id,
        input.start_time_local,
        input.end_time_local,
      );
    }
    if (
      input.start_time_local < '0000' ||
      input.start_time_local > '2359' ||
      input.end_time_local < '0000' ||
      input.end_time_local > '2359'
    ) {
      throw new WorkingDayStartEndTimeInvalidRange(
        id,
        input.start_time_local,
        input.end_time_local,
      );
    }
    const [result] = await this.workingDaysRepository.update(
      {
        id: id,
        deleted_on: null,
        tenant_id: current_user.tenant_id,
      },
      { ...input, ...{ updated_by: current_user.id } },
      output,
    );
    return result;
  }

  async create(
    current_user: ICurrentUser,
    newObj: WorkingDayInput,
    output?: string[],
  ): Promise<WorkingDay> {
    const [workingDay] = await this.findByWeekday(
      current_user,
      newObj.week_day,
    );
    if (workingDay) throw new WorkingDayAlreadyExistException(workingDay.id);
    if (newObj.full_day) {
      newObj.start_time_local = '0000';
      newObj.end_time_local = '2359';
    }
    if (newObj.start_time_local > newObj.end_time_local) {
      throw new WorkingDayStartTimeLessThanEndTimeException(
        null,
        newObj.start_time_local,
        newObj.end_time_local,
      );
    }
    if (
      newObj.start_time_local < '0000' ||
      newObj.start_time_local > '2359' ||
      newObj.end_time_local < '0000' ||
      newObj.end_time_local > '2359'
    ) {
      throw new WorkingDayStartEndTimeInvalidRange(
        null,
        newObj.start_time_local,
        newObj.end_time_local,
      );
    }
    const input: ICreateWorkingDayInput = {
      ...newObj,
      ...{
        tenant_id: current_user.tenant_id,
        created_by: current_user.id,
        updated_by: current_user.id,
      },
    };
    const [result] = await this.workingDaysRepository.create(input, output);
    return result;
  }

  async delete(current_user: ICurrentUser, id: string): Promise<boolean> {
    const result = await this.workingDaysRepository.markAsDelete(
      current_user.tenant_id,
      current_user.id,
      id,
    );
    return !!result;
  }

  async findByWeekday(
    current_user: ICurrentUser,
    week_day: string,
  ): Promise<WorkingDay[]> {
    const checks: KeyValInput[] = [
      {
        record_key: 'week_day',
        record_value: week_day,
      },
    ];
    return this.findByProperty(current_user, checks, [
      'id',
      'week_day',
      'start_time_local',
      'end_time_local',
    ]);
  }

  async isWorkingDay(tenant_id: string, date_string: string): Promise<boolean> {
    const date = moment(date_string).utc();
    const hours: string =
      date.hour() < 10 ? '0' + date.hour() : date.hour().toString();
    const minutes: string =
      date.minute() < 10 ? '0' + date.minute() : date.minutes().toString();
    const weekDay: string = Object.keys(WEEK_DAYS)[date.day()];
    const conditions = {
      week_day: weekDay,
      tenant_id: tenant_id,
      status: STATUS.ACTIVE,
      deleted_on: null,
    };
    const working_days: WorkingDay[] = await this.workingDaysRepository.findByDayAndTime(
      `${hours}${minutes}`,
      conditions,
      ['id', 'start_time_local', 'end_time_local', 'full_day'],
    );
    return !!working_days?.length;
  }
}
