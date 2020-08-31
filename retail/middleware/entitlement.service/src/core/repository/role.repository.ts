import {Injectable} from '@nestjs/common';

import { BaseRepository } from './base.repository';
import {STATUS, TABLE} from '@common/constants';
import {IdsInput} from '@common/inputs/ids.input';

@Injectable()
export class RoleRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.ROLE}.id`,
    `${TABLE.ROLE}.name`,
    `${TABLE.ROLE}.status`,
    `${TABLE.ROLE}.tenant_id`,
    `${TABLE.ROLE}.description`,
    `${TABLE.ROLE}.updated_on`,
    `${TABLE.ROLE}.updated_by`,
    `${TABLE.ROLE}.deleted_on`,
    `${TABLE.ROLE}.deleted_by`,
    `${TABLE.ROLE}.created_by`,
    `${TABLE.ROLE}.created_on`
  ];

  constructor() {
    super(TABLE.ROLE);
  }

  async listRolesByUserID(userIds): Promise<any> {
    const condition = {};
    condition[`${TABLE.ROLE}.status`] = STATUS.ACTIVE;
    condition[`${TABLE.ROLE}.deleted_on`] = null;
    return this._connection(TABLE.ROLE)
      .select([...this.__attributes, `${TABLE.USER_ROLE}.user_id`])
      .leftJoin(
        TABLE.USER_ROLE,
        `${TABLE.ROLE}.id`,
        `${TABLE.USER_ROLE}.role_id`,
      )
      .whereIn(`${TABLE.USER_ROLE}.user_id`, userIds)
      .where(condition);
  }

  async update(condition: Record<string, any>,
               role: Record<string, any>,
               keys: string[]): Promise<any> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    try{
      const module_permission_ids: IdsInput[] = role.permissions;
      delete role.permissions;
      const response = await trx(TABLE.ROLE).where(condition).update(role, keys);
      if(module_permission_ids?.length > 0) {
        const modulePermissionsToDelete = [];
        const newModulePermissions = [];
        for (const mpi of module_permission_ids) {
          mpi._deleted ? modulePermissionsToDelete.push(mpi.id) : newModulePermissions.push(mpi.id);
        }
        // deleting module-permission-roles
        if (modulePermissionsToDelete.length > 0)
          await trx(TABLE.MODULE_PERMISSION_ROLE).whereIn('module_permission_id', modulePermissionsToDelete)
          .where({role_id: response[0].id || response[0]})
          .del();
        // checking which of Ids already exist
        const idsAlready = await trx(TABLE.MODULE_PERMISSION_ROLE).select(['module_permission_id'])
          .whereIn('module_permission_id', newModulePermissions)
          .where({role_id: response[0].id || response[0]});
        // removing already existing Ids
        idsAlready.forEach(idObj => {
          newModulePermissions.splice(newModulePermissions.indexOf(idObj.module_permission_id || idObj), 1)
        });
        // creating new module-permission-roles
        const module_permission_roles = newModulePermissions.map(mpi => {
          return {
            role_id : response[0].id || response[0],
            module_permission_id : mpi,
          };
        });
        if(module_permission_roles.length > 0) await trx(TABLE.MODULE_PERMISSION_ROLE).insert(module_permission_roles, ['id']);
      }
      await trx.commit();
      return response;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }

  async create(role: Record<string, any>, keys: string[]): Promise<any> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    try {
      const permissions = role.permissions;
      delete role.permissions;
      const response = await trx(TABLE.ROLE).insert(role, keys);
      if (permissions) {
        const module_permission_roles = permissions.map(module_permission => {
          return {
            role_id: response[0].id || response[0],
            module_permission_id: module_permission['id'],
          };
        });
        await trx(TABLE.MODULE_PERMISSION_ROLE).insert(
          module_permission_roles,
          ['module_permission_id'],
        );
      }
      await trx.commit();
      return response;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }
}
