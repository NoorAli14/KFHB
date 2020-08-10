import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import {STATUS, TABLE, TEMP_ROLE} from '@common/constants';

@Injectable()
export class UserRepository extends BaseRepository {
  constructor() {
    super(TABLE.USER);
  }

  async create(user: Record<string, any>, keys: string[]): Promise<any> {
    const roleIds: [] = user.role_ids;
    delete user.role_ids;
      return this._connection(TABLE.USER)
        .insert(user, keys)
        .then(async function (response) {
          const user_roles = [];
          roleIds.forEach(roleId => {
            const user_role = {
              user_id : response[0].id,
              role_id : roleId,
              status : STATUS.ACTIVE,
              created_by : TEMP_ROLE.ADMIN,
            };
            user_roles.push(user_role);
          });
          await this._connection(TABLE.USER_ROLE).insert(user_roles);
          return response;
        }.bind(this))
  }

}
