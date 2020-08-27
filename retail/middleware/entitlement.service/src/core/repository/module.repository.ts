import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import {STATUS, TABLE} from '@common/constants';
import {loaderSerializer} from '@common/utilities';

@Injectable()
export class ModuleRepository extends BaseRepository {
  private readonly __attributes: string[] = [`${TABLE.MODULE}.id`, `${TABLE.MODULE}.name`, `${TABLE.MODULE}.status`, `${TABLE.MODULE}.parent_id`, `${TABLE.MODULE}.created_by`, `${TABLE.MODULE}.created_on`]
  constructor() {
    super(TABLE.MODULE);
  }

  async listModulesByRoleID(roleIds): Promise<any>{
    const condition = {};
    condition[`${TABLE.MODULE}.status`] = STATUS.ACTIVE;
    condition[`${TABLE.MODULE}.parent_id`] = null;
    const modules: any = await this._connection(TABLE.MODULE)
        .distinct([...this.__attributes, `${TABLE.MODULE_PERMISSION_ROLE}.role_id`])
        .innerJoin(TABLE.MODULE_PERMISSION, `${TABLE.MODULE}.id`, `${TABLE.MODULE_PERMISSION}.module_id`)
        .innerJoin(TABLE.MODULE_PERMISSION_ROLE, `${TABLE.MODULE_PERMISSION_ROLE}.module_permission_id`, `${TABLE.MODULE_PERMISSION}.id`)
        .whereIn(`${TABLE.MODULE_PERMISSION_ROLE}.role_id`, roleIds)
        .where(condition);

    return loaderSerializer(modules, roleIds, 'role_id');
  }

  async listModulesByParentModuleID(parentIds): Promise<any>{
    const condition = {};
    condition[`${TABLE.MODULE}.status`] = STATUS.ACTIVE;
    let query:any;
    if (typeof parentIds[0] === 'string') {
      query = this._connection(TABLE.MODULE)
      .select(this.__attributes)
      .whereIn(`${TABLE.MODULE}.parent_id`, parentIds)
    } else {
      query = this._connection(TABLE.MODULE)
      .distinct([...this.__attributes, `${TABLE.MODULE_PERMISSION_ROLE}.role_id`, `${TABLE.MODULE_PERMISSION}.module_id`])
      .innerJoin(TABLE.MODULE_PERMISSION, `${TABLE.MODULE}.id`, `${TABLE.MODULE_PERMISSION}.module_id`)
      .innerJoin(TABLE.MODULE_PERMISSION_ROLE, `${TABLE.MODULE_PERMISSION_ROLE}.module_permission_id`, `${TABLE.MODULE_PERMISSION}.id`)
      .whereIn(`${TABLE.MODULE_PERMISSION_ROLE}.role_id`, parentIds.map(obj => obj.role_id))
      .whereIn(`${TABLE.MODULE}.parent_id`, parentIds.map(obj => obj.module_id))
    }
    return query.where(condition);
  }

  async listModulesByUserID(userIds): Promise<any>{
    const condition = {};
    condition[`${TABLE.MODULE}.status`] = STATUS.ACTIVE;
    condition[`${TABLE.ROLE}.status`] = STATUS.ACTIVE;
    condition[`${TABLE.MODULE}.parent_id`] = null;
    return this._connection(TABLE.MODULE)
    .distinct([...this.__attributes, `${TABLE.USER_ROLE}.user_id`, `${TABLE.MODULE_PERMISSION_ROLE}.role_id`, `${TABLE.MODULE_PERMISSION}.module_id`])
    .innerJoin(TABLE.MODULE_PERMISSION, `${TABLE.MODULE}.id`, `${TABLE.MODULE_PERMISSION}.module_id`)
    .innerJoin(TABLE.MODULE_PERMISSION_ROLE, `${TABLE.MODULE_PERMISSION_ROLE}.module_permission_id`, `${TABLE.MODULE_PERMISSION}.id`)
    .innerJoin(TABLE.ROLE, `${TABLE.ROLE}.id`, `${TABLE.MODULE_PERMISSION_ROLE}.role_id`)
    .innerJoin(TABLE.USER_ROLE, `${TABLE.ROLE}.id`, `${TABLE.USER_ROLE}.role_id`)
    .whereIn(`${TABLE.USER_ROLE}.user_id`, userIds)
    .where(condition);
  }
}
