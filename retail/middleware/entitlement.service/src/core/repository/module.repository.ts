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
}
