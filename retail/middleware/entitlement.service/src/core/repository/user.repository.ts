import {Injectable} from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import {STATUS, TABLE, TEMP_ROLE} from "@common/constants";
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
      if(roles.length > 0) {
        // deleting role-user relations
        const rolesToDelete = roles.filter(role => role._deleted).map(role => role.id);
        await trx(TABLE.USER_ROLE)
          .whereIn('role_id', rolesToDelete)
          .where({user_id: response[0].id || response[0]})
          .update({status: STATUS.INACTIVE});
        // creating role-user relations
        const user_roles = roles.filter(role => !role._deleted).map(role => {
          return {
            user_id : response[0].id || response[0],
            role_id : role.id,
            status : STATUS.ACTIVE,
            created_by : TEMP_ROLE.ADMIN,
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
            created_by : TEMP_ROLE.ADMIN,
          };
        });
        await trx(TABLE.USER_ROLE).insert(user_roles, ['id']);
      }
      await trx.commit();
      return response
    } catch (e) {
      await trx.rollback();
      throw e
    }
  }
}
