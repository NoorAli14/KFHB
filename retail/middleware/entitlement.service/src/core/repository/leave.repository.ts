import { Injectable } from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import { TABLE } from "@common/constants";
import {Leave} from '@app/v1/leave/leave.model';

@Injectable()
export class LeaveRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.LEAVE}.id`,
    `${TABLE.LEAVE}.user_id`,
    `${TABLE.LEAVE}.calendar_day`,
    `${TABLE.LEAVE}.holiday_type`,
    `${TABLE.LEAVE}.holiday_details`,
    `${TABLE.LEAVE}.remarks`,
    `${TABLE.LEAVE}.is_repetitive`,
    `${TABLE.LEAVE}.status`,
    `${TABLE.LEAVE}.created_on`,
    `${TABLE.LEAVE}.created_by`,
    `${TABLE.LEAVE}.updated_on`,
    `${TABLE.LEAVE}.updated_by`,
    `${TABLE.LEAVE}.deleted_on`,
    `${TABLE.LEAVE}.deleted_by`,
  ];

  constructor() {
    super(TABLE.LEAVE);
  }

  async listLeavesByUserID(userIds: readonly string[]): Promise<Leave[]>{
    return this._connection(TABLE.LEAVE)
    .select(this.__attributes)
    .whereIn('user_id', userIds)
    .where({deleted_on : null})
    .orderBy('created_on', 'desc');
  }

  async findByDate(date: string, conditions: Record<string, any>, keys: string[]): Promise<Leave[]> {
    return this._connection(this._tableName)
    .select(keys)
    .where('start_date', '>=', date)
    .where('end_date', '<', date)
    .where(conditions);
  }
}
