import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { BaseRepository } from './base.repository';
import {MESSAGES, STATUS, TABLE, TEMP_ROLE} from '@common/constants';

@Injectable()
export class RoleRepository extends BaseRepository {
  constructor() {
    super(TABLE.ROLE);
  }

  async listRolesByUserID(userIds): Promise<any>{
    const condition = {};
    condition[`${TABLE.ROLE}.status`] = STATUS.ACTIVE;
    return this._connection(TABLE.ROLE)
        .select(`${TABLE.ROLE}.*`, `${TABLE.USER_ROLE}.user_id`)
        .leftJoin(TABLE.USER_ROLE, `${TABLE.ROLE}.id`, `${TABLE.USER_ROLE}.role_id`)
        .whereIn(`${TABLE.USER_ROLE}.user_id`, userIds)
        .where(condition)
  }

  async create(role: Record<string, any>, keys: string[]): Promise<any> {
    if(role.modules && role.modules.length) {
      const modules: [] = role.modules;
      delete role.modules;
      const trxProvider = this._connection.transactionProvider();
      const trx = await trxProvider();
      const response = await trx(TABLE.ROLE).insert(role, keys);
      if(response){
        const role_modules = [];
        modules.forEach(module => {
          //validate role ID
          const role_module = {
            role_id : response[0].id || response[0],
            module_id : module['id'],
            status : STATUS.ACTIVE,
            created_by : TEMP_ROLE.ADMIN,
          };
          role_modules.push(role_module);
        });
        const result = await trx(TABLE.ROLE_MODULE).insert(role_modules, ['id']);
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
      return super.create(role, keys)
    }
  }

  // async create(role: Record<string, any>, keys: string[]): Promise<any> {
  //   const moduleIds: [] = role.module_ids;
  //   delete role.module_ids;
  //   const permissionIds: [] = role.permission_ids;
  //   delete role.permission_ids;
  //   return this._connection(TABLE.ROLE)
  //   .insert(role, keys)
  //   .then(async function (response) {
  //     const role_modules = [];
  //     moduleIds.forEach(moduleId => {
  //       const role_module = {
  //         role_id : response[0].id,
  //         module_id : moduleId,
  //         status : STATUS.ACTIVE,
  //         created_by : TEMP_ROLE.ADMIN,
  //       };
  //       role_modules.push(role_module);
  //     });
  //
  //
  //     await this._connection(TABLE.ROLE_MODULE).insert(role_modules, "*")
  //     .then(async function (role_module_responses) {
  //         const role_module_permissions = [];
  //         permissionIds.forEach(permissionId => {
  //             role_module_responses.forEach(role_module_response => {
  //                 const role_module_permission = {
  //                     role_module_id : role_module_response.id,
  //                     permission_id : permissionId,
  //                     status : STATUS.ACTIVE,
  //                     created_by : TEMP_ROLE.ADMIN,
  //                 };
  //                 role_module_permissions.push(role_module_permission);
  //             });
  //         });
  //         await this._connection(TABLE.ROLE_MODULE_PERMISSION).insert(role_module_permissions);
  //         return response;
  //     }.bind(this));
  //     return response;
  //   }.bind(this))
  // }
}
