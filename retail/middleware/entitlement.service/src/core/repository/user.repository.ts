import {Injectable} from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import {STATUS, TABLE} from "@common/constants";
import {IdsInput} from "@common/inputs/ids.input";

@Injectable()
export class UserRepository extends BaseRepository {
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
}
