import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import {STATUS, TABLE} from '@common/constants';

@Injectable()
export class ModuleRepository extends BaseRepository {
  constructor() {
    super(TABLE.MODULE);
  }

  async listModulesByRoleID(roleIds): Promise<any>{
    const condition = {};
    condition[`${TABLE.MODULE}.status`] = STATUS.ACTIVE;
    condition[`${TABLE.MODULE}.parent_id`] = null;
    return this._connection(TABLE.MODULE)
        .select(`${TABLE.MODULE}.*`, `${TABLE.ROLE_MODULE}.role_id`)
        .leftJoin(TABLE.ROLE_MODULE, `${TABLE.MODULE}.id`, `${TABLE.ROLE_MODULE}.module_id`)
        .whereIn(`${TABLE.ROLE_MODULE}.role_id`, roleIds)
        .where(condition)
  }

  async listModulesByParentModuleID(parentIds): Promise<any>{
    const condition = {};
    condition[`${TABLE.MODULE}.status`] = STATUS.ACTIVE;
    return this._connection(TABLE.MODULE)
        .select(`${TABLE.MODULE}.*`)
        .whereIn(`${TABLE.MODULE}.parent_id`, parentIds)
        .where(condition)
  }

  async listModulesByUserID(userIds): Promise<any>{
    const condition = {};
    condition[`${TABLE.MODULE}.status`] = STATUS.ACTIVE;
    condition[`${TABLE.MODULE}.parent_id`] = null;
    return this._connection(TABLE.MODULE)
    .select(`${TABLE.MODULE}.*`, `${TABLE.USER_ROLE}.user_id`)
    .innerJoin(TABLE.ROLE_MODULE, `${TABLE.ROLE_MODULE}.module_id`, `${TABLE.MODULE}.id`)
    .innerJoin(TABLE.USER_ROLE, `${TABLE.ROLE_MODULE}.role_id`, `${TABLE.USER_ROLE}.role_id`)
    .whereIn(`${TABLE.USER_ROLE}.user_id`, userIds)
    .where(condition)
  }
}
