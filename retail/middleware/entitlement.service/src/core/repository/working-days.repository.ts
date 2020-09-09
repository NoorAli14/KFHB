import { Injectable } from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import { TABLE } from "@common/constants";

@Injectable()
export class WorkingDaysRepository extends BaseRepository {
  constructor() {
    super(TABLE.WORKING_WEEK);
  }

  async findByDuration(obj: Record<string, any>, keys?: string[]): Promise<any> {
    return this._connection(this._tableName)
      .select(keys)
      .where('start_time', '<', obj.time)
      .where('end_time', '>=', obj.time)
      .where('week_day', obj.week_day)
      .where('deleted_on', null)
  }
}
