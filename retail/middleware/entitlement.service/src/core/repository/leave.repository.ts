import { Injectable } from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import { TABLE } from "@common/constants";
import {loaderSerializer, toPlainAttributes} from '@common/utilities';
import {Leave} from '@app/v1/leave/leave.model';

@Injectable()
export class LeaveRepository extends BaseRepository {
  private readonly __attributes: string[] = toPlainAttributes(Leave, TABLE.LEAVE);

  constructor() {
    super(TABLE.LEAVE);
  }

  async listLeavesByUserID(userIds): Promise<any>{
    const result = await this._connection(TABLE.LEAVE)
    .select(this.__attributes)
    .whereIn(`${TABLE.LEAVE}.user_id`, userIds);
    return loaderSerializer(result, userIds, 'user_id')
  }
}
