import {Injectable} from '@nestjs/common';
import { BaseRepository } from './base.repository';
import {STATUS, TABLE,} from '@common/constants';

@Injectable()
export class RoleRepository extends BaseRepository {
  constructor() {
    super(TABLE.ROLE);
  }

  async listRolesByUserID(userIds): Promise<any>{
    const condition = {};
    condition[`${TABLE.ROLE}.status`] = STATUS.ACTIVE;
    const roles: any = await this._connection(TABLE.ROLE)
        .select(`${TABLE.ROLE}.*`, `${TABLE.USER_ROLE}.user_id`)
        .leftJoin(TABLE.USER_ROLE, `${TABLE.ROLE}.id`, `${TABLE.USER_ROLE}.role_id`)
        .whereIn(`${TABLE.USER_ROLE}.user_id`, userIds)
        .where(condition);

    const rolesLookups = {};
    roles.forEach(role => {
      if (!rolesLookups[role.user_id])
        rolesLookups[role.user_id] = [];
      rolesLookups[role.user_id].push(role)
    });
    return userIds.map(id => rolesLookups[id] || []);
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
