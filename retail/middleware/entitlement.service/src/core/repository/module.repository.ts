import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class ModuleRepository extends BaseRepository {
  constructor() {
    super(TABLE.MODULE);
  }

  async listModulesByRoleID(roleIds): Promise<any>{
    return this._connection(TABLE.MODULE)
        .select(`${TABLE.MODULE}.*`, `${TABLE.ROLE_MODULE}.role_id`)
        .leftJoin(TABLE.ROLE_MODULE, `${TABLE.MODULE}.id`, `${TABLE.ROLE_MODULE}.module_id`)
        .whereIn(`${TABLE.ROLE_MODULE}.role_id`, roleIds)
  }

  async listModulesByParentModuleID(parentIds): Promise<any>{
    return this._connection(TABLE.MODULE)
        .select(`${TABLE.MODULE}.*`)
        .whereIn(`${TABLE.MODULE}.parent_id`, parentIds)
  }

  async listModulesByUserID(userIds): Promise<any>{
    return this._connection(TABLE.MODULE)
    .select(`${TABLE.MODULE}.*`, `${TABLE.USER_ROLE}.user_id`)
    .innerJoin(TABLE.ROLE_MODULE, `${TABLE.ROLE_MODULE}.module_id`, `${TABLE.MODULE}.id`)
    .innerJoin(TABLE.USER_ROLE, `${TABLE.ROLE_MODULE}.role_id`, `${TABLE.USER_ROLE}.role_id`)
    .whereIn(`${TABLE.USER_ROLE}.user_id`, userIds)
  }
}
