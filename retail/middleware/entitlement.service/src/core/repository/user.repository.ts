import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import {MESSAGES, STATUS, TABLE, TEMP_ROLE} from "@common/constants";
import {IdsInput} from "@common/inputs/ids.input";

@Injectable()
export class UserRepository extends BaseRepository {
  constructor() {
    super(TABLE.USER);
  }

  async update_pending(user: Record<string, any>, keys: string[]): Promise<any> {
    if(user.roles?.length) {
      const roles: IdsInput[] = user.roles;
      delete user.roles;
      const rolesToDelete = roles.filter(role => role._deleted);

      const trxProvider = this._connection.transactionProvider();
      const trx = await trxProvider();
      const response = await trx(TABLE.USER).insert(user, keys);
      if(response){
        const user_roles = [];
        roles.forEach(role => {
          const user_role = {
            user_id : response[0].id || response[0],
            role_id : role['id'],
            status : STATUS.ACTIVE,
            created_by : TEMP_ROLE.ADMIN,
          };
          user_roles.push(user_role);
        });
        const result = await trx(TABLE.USER_ROLE).insert(user_roles, "id");
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

  async create(user: Record<string, any>, keys: string[]): Promise<any> {
    if(user.roles?.length) {
      const roles: [] = user.roles;
      delete user.roles;
      const trxProvider = this._connection.transactionProvider();
      const trx = await trxProvider();
      const response = await trx(TABLE.USER).insert(user, keys);
      if(response){
        const user_roles = [];
        roles.forEach(role => {
          //validate role ID
          const user_role = {
            user_id : response[0].id || response[0],
            role_id : role['id'],
            status : STATUS.ACTIVE,
            created_by : TEMP_ROLE.ADMIN,
          };
          user_roles.push(user_role);
        });
        const result = await trx(TABLE.USER_ROLE).insert(user_roles, ['id']);
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
