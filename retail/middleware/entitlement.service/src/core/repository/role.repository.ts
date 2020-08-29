import {Injectable} from '@nestjs/common';
import { BaseRepository } from './base.repository';
import {STATUS, TABLE, TEMP_ROLE,} from '@common/constants';
import {IdsInput} from '@common/inputs/ids.input';

@Injectable()
export class RoleRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.MODULE}.id`,
    `${TABLE.MODULE}.name`,
    `${TABLE.MODULE}.status`,
    `${TABLE.MODULE}.description`,
    `${TABLE.MODULE}.updated_on`,
    `${TABLE.MODULE}.updated_by`,
    `${TABLE.MODULE}.deleted_on`,
    `${TABLE.MODULE}.deleted_by`,
    `${TABLE.MODULE}.created_by`,
    `${TABLE.MODULE}.created_on`
  ];

  constructor() {
    super(TABLE.ROLE);
  }

  async listRolesByUserID(userIds): Promise<any>{
    const condition = {};
    condition[`${TABLE.ROLE}.status`] = STATUS.ACTIVE;
    return this._connection(TABLE.ROLE)
        .select([...this.__attributes, `${TABLE.USER_ROLE}.user_id`])
        .leftJoin(TABLE.USER_ROLE, `${TABLE.ROLE}.id`, `${TABLE.USER_ROLE}.role_id`)
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
      if(module_permission_ids.length > 0) {
        // deleting role and module-permission relations
        const modulePermissionsToDelete = module_permission_ids.filter(module_permission_id => module_permission_id._deleted)
          .map(module_permission_id => module_permission_id.id);
        await trx(TABLE.MODULE_PERMISSION_ROLE)
          .whereIn('module_permission_id', modulePermissionsToDelete)
          .where({role_id: response[0].id || response[0]})
          .update({status: STATUS.INACTIVE});
        const module_permission_roles = module_permission_ids.filter(module_permission_id => !module_permission_id._deleted)
          .map(module_permission_id => {
            return {
              role_id : response[0].id || response[0],
              module_permission_id : module_permission_id.id,
              status : STATUS.ACTIVE,
              created_by : TEMP_ROLE.ADMIN,
            };
        });
        if(module_permission_roles.length > 0) await trx(TABLE.MODULE_PERMISSION_ROLE).insert(module_permission_roles, ['id']);
      }
      await trx.commit();
      return response
    } catch (e) {
      await trx.rollback();
      throw e
    }
  }

  async create(role: Record<string, any>, keys: string[]): Promise<any> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    try{
      const permissions = role.permissions;
      delete role.permissions;
      const response = await trx(TABLE.ROLE).insert(role, keys);
      if(permissions) {
        const module_permission_roles = permissions.map(module_permission => {
          return {
            role_id : response[0].id || response[0],
            module_permission_id : module_permission['id'],
          };
        });
        await trx(TABLE.MODULE_PERMISSION_ROLE).insert(module_permission_roles, ['module_permission_id']);
      }
      await trx.commit();
      return response
    } catch (e) {
      await trx.rollback();
      throw e
    }
  }
}
