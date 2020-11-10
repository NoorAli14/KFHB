import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class PermissionRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.PERMISSION}.id`,
    `${TABLE.PERMISSION}.record_type`,
    `${TABLE.PERMISSION}.created_on`,
    `${TABLE.PERMISSION}.created_by`,
  ];

  constructor() {
    super(TABLE.PERMISSION, false);
  }

  async listPermissionsByModuleID(ids: readonly string[] | any): Promise<any> {
    if (typeof ids[0] === 'string') {
      return this._connection(TABLE.PERMISSION)
        .select([
          ...this.__attributes,
          `${TABLE.MODULE_PERMISSION}.module_id`,
          `${TABLE.MODULE_PERMISSION}.id as module_permission_id`,
        ])
        .innerJoin(
          TABLE.MODULE_PERMISSION,
          `${TABLE.PERMISSION}.id`,
          `${TABLE.MODULE_PERMISSION}.permission_id`,
        )
        .whereIn(`${TABLE.MODULE_PERMISSION}.module_id`, ids)
        .orderBy(`${TABLE.PERMISSION}.created_on`, 'desc');
    } else {
      return this._connection(TABLE.PERMISSION)
        .distinct([
          ...this.__attributes,
          `${TABLE.MODULE_PERMISSION}.module_id`,
          `${TABLE.MODULE_PERMISSION_ROLE}.role_id`,
          `${TABLE.MODULE_PERMISSION}.id as module_permission_id`,
        ])
        .innerJoin(
          TABLE.MODULE_PERMISSION,
          `${TABLE.PERMISSION}.id`,
          `${TABLE.MODULE_PERMISSION}.permission_id`,
        )
        .innerJoin(
          TABLE.MODULE_PERMISSION_ROLE,
          `${TABLE.MODULE_PERMISSION_ROLE}.module_permission_id`,
          `${TABLE.MODULE_PERMISSION}.id`,
        )
        .whereIn(
          `${TABLE.MODULE_PERMISSION_ROLE}.role_id`,
          ids.map(obj => obj.role_id),
        )
        .whereIn(
          `${TABLE.MODULE_PERMISSION}.module_id`,
          ids.map(obj => obj.module_id),
        )
        .orderBy(`${TABLE.PERMISSION}.created_on`, 'desc');
    }
  }
}
