import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class RoleRepository extends BaseRepository {
  constructor() {
    super(TABLE.ROLE);
  }

  async listRolesByUserID(userIds): Promise<any>{
    return this._connection(TABLE.ROLE)
        .select(`${TABLE.ROLE}.*`)
        .innerJoin(TABLE.USER_ROLE, `${TABLE.ROLE}.id`, `${TABLE.USER_ROLE}.role_id`)
        .whereIn(`${TABLE.USER_ROLE}.user_id`, userIds)
  }
}
