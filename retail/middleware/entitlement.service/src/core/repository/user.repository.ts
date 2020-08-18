import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import {MESSAGES, STATUS, TABLE, TEMP_ROLE} from "@common/constants";

@Injectable()
export class UserRepository extends BaseRepository {
  constructor() {
    super(TABLE.USER);
  }

  async create(user: Record<string, any>, keys: string[]): Promise<any> {
    if(user.role_ids && user.role_ids.length) {
      const roleIds: [] = user.role_ids;
      delete user.role_ids;
      const trxProvider = this._connection.transactionProvider();
      const trx = await trxProvider();
      const response = await trx(TABLE.USER).insert(user, keys);
      if(response){
        const user_roles = [];
        roleIds.forEach(roleId => {
          const user_role = {
            user_id : response[0].id || response[0],
            role_id : roleId,
            status : STATUS.ACTIVE,
            created_by : TEMP_ROLE.ADMIN,
          };
          user_roles.push(user_role);
        });
        const result = await trx(TABLE.USER_ROLE).insert(user_roles, "*");
        if(!result){
          await trx.rollback();
          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: MESSAGES.BAD_REQUEST,
          }, HttpStatus.BAD_REQUEST);
        }
      } else {
        await trx.rollback();
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: MESSAGES.BAD_REQUEST,
        }, HttpStatus.BAD_REQUEST);
      }
      await trx.commit();
      return response
    } else {
      return super.create(user,keys)
    }
  }
}
