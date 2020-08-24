import { Injectable } from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import { TABLE } from "@common/constants";

@Injectable()
export class LeaveRepository extends BaseRepository {
  constructor() {
    super(TABLE.LEAVE);
  }

  async listLeavesByUserID(userIds): Promise<any>{
    return this._connection(TABLE.LEAVE)
    .select(`${TABLE.LEAVE}.*`)
    .whereIn(`${TABLE.LEAVE}.user_id`, userIds)
  }
}
