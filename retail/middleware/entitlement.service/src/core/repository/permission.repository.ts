import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class PermissionRepository extends BaseRepository {
  constructor() {
    super(TABLE.PERMISSION);
  }

  async listPermissionsByModuleID(moduleIds): Promise<any>{
    return this._connection(TABLE.PERMISSION)
        .select(`${TABLE.PERMISSION}.*`, `${TABLE.ROLE_MODULE}.module_id`)
        .leftJoin(TABLE.ROLE_MODULE_PERMISSION, `${TABLE.PERMISSION}.id`, `${TABLE.ROLE_MODULE_PERMISSION}.permission_id`)
        .leftJoin(TABLE.ROLE_MODULE, `${TABLE.ROLE_MODULE}.id`, `${TABLE.ROLE_MODULE_PERMISSION}.role_module_id`)
        .whereIn(`${TABLE.ROLE_MODULE}.module_id`, moduleIds)
  }
}
