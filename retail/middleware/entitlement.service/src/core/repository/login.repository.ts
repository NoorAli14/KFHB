import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import {STATUS, TABLE, TEMP_ROLE} from '@common/constants';

@Injectable()
export class LoginRepository extends BaseRepository {
  constructor() {
    super(TABLE.USER);
  }

  async getUser(email){

  }


  async listAndIncludeRoles(keys: string[], condition): Promise<any>{
    return this._connection(this._tableName)
      .select(keys)
      .leftJoin(TABLE.USER_ROLE, `${TABLE.USER_ROLE}.user_id`, `${TABLE.USER}.id`)
      .leftJoin(TABLE.ROLE, `${TABLE.USER_ROLE}.role_id`, `${TABLE.ROLE}.id`)
      .where(condition);
  }

}
