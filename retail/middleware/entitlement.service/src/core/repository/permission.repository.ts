import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class PermissionRepository extends BaseRepository {
  constructor() {
    super(TABLE.PERMISSION);
  }

  async listPermissionsByModuleID(ids: any): Promise<any> {
    if (typeof ids[0] === 'string') {
      return this._connection(TABLE.PERMISSION)
      .select(`${TABLE.PERMISSION}.*`, `${TABLE.ROLE_MODULE}.module_id`)
      .leftJoin(TABLE.ROLE_MODULE_PERMISSION, `${TABLE.PERMISSION}.id`, `${TABLE.ROLE_MODULE_PERMISSION}.permission_id`)
      .leftJoin(TABLE.ROLE_MODULE, `${TABLE.ROLE_MODULE}.id`, `${TABLE.ROLE_MODULE_PERMISSION}.role_module_id`)
      .whereIn(`${TABLE.ROLE_MODULE}.module_id`, ids)
    } else {
      let roleIds = ids.map(obj => obj.role_id);
      roleIds = [...new Set(roleIds)];
      let moduleIds = ids.map(obj => obj.module_id);
      moduleIds = [...new Set(moduleIds)];

      let role_module_ids = await this._connection(TABLE.ROLE_MODULE)
      .select(`${TABLE.ROLE_MODULE}.id`)
      .whereIn(`${TABLE.ROLE_MODULE}.module_id`, moduleIds)
      .whereIn(`${TABLE.ROLE_MODULE}.role_id`, roleIds);

      role_module_ids = role_module_ids.map(rmi => rmi.id);

      return this._connection(TABLE.PERMISSION)
      .select(`${TABLE.PERMISSION}.*`, `${TABLE.ROLE_MODULE}.module_id`, `${TABLE.ROLE_MODULE}.role_id`)
      .leftJoin(TABLE.ROLE_MODULE_PERMISSION, `${TABLE.PERMISSION}.id`, `${TABLE.ROLE_MODULE_PERMISSION}.permission_id`)
      .leftJoin(TABLE.ROLE_MODULE, `${TABLE.ROLE_MODULE}.id`, `${TABLE.ROLE_MODULE_PERMISSION}.role_module_id`)
      .whereIn(`${TABLE.ROLE_MODULE}.id`, role_module_ids)
    }
  }
}
