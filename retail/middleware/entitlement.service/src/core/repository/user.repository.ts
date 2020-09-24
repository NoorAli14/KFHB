import {Injectable} from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import {STATUS, TABLE} from "@common/constants";
import {IdsInput} from "@common/inputs/ids.input";

@Injectable()
export class UserRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.USER}.id`,
    `${TABLE.USER}.username`,
    `${TABLE.USER}.email`,
    `${TABLE.USER}.contact_no`,
    `${TABLE.USER}.first_name`,
    `${TABLE.USER}.middle_name`,
    `${TABLE.USER}.last_name`,
    `${TABLE.USER}.status`,
    `${TABLE.USER}.gender`,
    `${TABLE.USER}.is_owner`,
    `${TABLE.USER}.date_of_birth`,
    `${TABLE.USER}.nationality_id`,
    `${TABLE.USER}.invitation_token`,
    `${TABLE.USER}.invitation_token_expiry`,
    `${TABLE.USER}.password_reset_token`,
    `${TABLE.USER}.password_reset_token_expiry`,
    `${TABLE.USER}.tenant_id`,
    `${TABLE.USER}.updated_on`,
    `${TABLE.USER}.updated_by`,
    `${TABLE.USER}.deleted_on`,
    `${TABLE.USER}.deleted_by`,
    `${TABLE.USER}.created_by`,
    `${TABLE.USER}.created_on`
  ];

  constructor() {
    super(TABLE.USER);
  }

  async update(condition: Record<string, any>,
               user: Record<string, any>,
               keys: string[]): Promise<any> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    try{
      const roles: IdsInput[] = user.roles;
      delete user.roles;
      const response = await trx(TABLE.USER).where(condition).update(user, keys);
      if(roles?.length > 0) {
        const rolesToDelete = [];
        const newUserRoles = [];
        for (const role of roles) {
          role._deleted ? rolesToDelete.push(role.id) : newUserRoles.push(role.id);
        }
        // deleting user-roles
        if (rolesToDelete.length > 0)
          await trx(TABLE.USER_ROLE).whereIn('role_id', rolesToDelete)
          .where({user_id: response[0].id || response[0]})
          .del();
        // checking which of Ids already exist
        const idsAlready = await trx(TABLE.USER_ROLE).select(['role_id'])
        .whereIn('role_id', newUserRoles)
        .where({user_id: response[0].id || response[0]});
        // removing already existing Ids
        idsAlready.forEach(idObj => {
          newUserRoles.splice(newUserRoles.indexOf(idObj.role_id || idObj), 1)
        });
        // creating new user-roles
        const user_roles = newUserRoles.map(role_id => {
          return {
            user_id : response[0].id || response[0],
            role_id : role_id,
            status : STATUS.ACTIVE,
            created_by : user.updated_by,
            created_on : user.updated_on,
          };
        });
        if(user_roles.length > 0) await trx(TABLE.USER_ROLE).insert(user_roles, ['id']);
      }
      await trx.commit();
      return response
    } catch (e) {
      await trx.rollback();
      throw e
    }
  }

  async create(user: Record<string, any>, keys: string[]): Promise<any> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    try{
      const roles = user.roles;
      delete user.roles;
      const response = await trx(TABLE.USER).insert(user, keys);
      if(roles) {
        const user_roles = roles.map(role => {
          return {
            user_id : response[0].id || response[0],
            role_id : role['id'],
            status : STATUS.ACTIVE,
            created_by : user.created_by,
            created_on : user.created_on,
          };
        });
        await trx(TABLE.USER_ROLE).insert(user_roles, ['id']);
      }
      await trx.commit();
      return response;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }

  async listExcludedUsers(userIds: string[], conditions: Record<string, any>): Promise<any>{
    return this._connection(TABLE.USER)
    .distinct(this.__attributes)
    .innerJoin(TABLE.USER_ROLE, `${TABLE.USER}.id`, `${TABLE.USER_ROLE}.user_id`)
    .innerJoin(TABLE.ROLE, `${TABLE.USER_ROLE}.role_id`, `${TABLE.ROLE}.id`)
    .innerJoin(TABLE.MODULE_PERMISSION_ROLE, `${TABLE.ROLE}.id`, `${TABLE.MODULE_PERMISSION_ROLE}.role_id`)
    .innerJoin(TABLE.MODULE_PERMISSION, `${TABLE.MODULE_PERMISSION_ROLE}.module_permission_id`, `${TABLE.MODULE_PERMISSION}.id`)
    .innerJoin(TABLE.PERMISSION, `${TABLE.MODULE_PERMISSION}.permission_id`, `${TABLE.PERMISSION}.id`)
    .whereNotIn(`${TABLE.USER}.id`, userIds)
    .where(conditions)
    .orderBy(`${TABLE.USER}.created_on`, 'desc');
  }
}
