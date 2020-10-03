import { Injectable } from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import { TABLE } from "@common/constants";
import {WorkingDay} from '@app/v1/working-days/working-day.model';

@Injectable()
export class WorkingDaysRepository extends BaseRepository {
  constructor() {
    super(TABLE.WORKING_WEEK);
  }

  async findByDayAndTime(time: string, conditions: Record<string, any>, keys: string[]): Promise<WorkingDay[]> {
    return this._connection(this._tableName)
    .select(keys)
    .where('start_time_local', '<', time)
    .where('end_time_local', '>', time)
    .where(conditions);
  }
}
