import {Injectable} from '@nestjs/common';

import { BaseRepository } from './base.repository';
import {STATUS, TABLE} from '@common/constants';
import {IdsInput} from '@common/inputs/ids.input';
import { Role } from '@app/v1/roles/role.model';
import { getCurrentTimeStamp } from '@common/utilities';
import {PaginationParams, SortingParam} from "@common/dtos";
import {QueryBuilder} from "knex";
import {RolesFilterParams} from "@app/v1/roles/dtos";

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

  async list(paginationParams: PaginationParams,
             filteringParams: RolesFilterParams,
             sortingParams: SortingParam,
             condition: Record<string, any>,
             output: string[]): Promise<any> {
    let dataQuery: QueryBuilder = this.getQuery(condition, filteringParams);
    const countQuery: QueryBuilder = this.getQuery(condition, filteringParams);
    dataQuery = dataQuery.orderBy(sortingParams?.sort_by || "created_on", sortingParams?.sort_order || "desc");
    return super.paginate(dataQuery, countQuery, paginationParams?.page, paginationParams?.limit, output)
  }

  getQuery(condition: Record<string, any>, filteringParams: RolesFilterParams): QueryBuilder {
    let query: QueryBuilder = this._connection(this._tableName).where(condition);
    if(filteringParams?.name) query = query.where('name', 'like', `%${filteringParams.name}%`);
    if(filteringParams?.status) query = query.where('status','=', filteringParams.status);
    if(filteringParams?.created_on)
      query = query.whereBetween('created_on', [filteringParams.created_on?.start, filteringParams.created_on?.end]);
    return query;
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
      .where(condition)
      .orderBy(`${TABLE.ROLE}.created_on`, 'desc');
  }

  async update(condition: Record<string, any>,
               role: Record<string, any>,
               keys: string[]): Promise<Role[]> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    try{
      const module_permission_ids: IdsInput[] = role.permissions;
      delete role.permissions;
      role.updated_on = getCurrentTimeStamp();
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
        // fetching parent module_permission_ids
        const parentModulePermissions = await this.getParentModules(newModulePermissions);
        parentModulePermissions.map(parentModulePermission => {
          newModulePermissions.push(parentModulePermission['id'])
        });
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
        if(module_permission_roles.length > 0) await trx(TABLE.MODULE_PERMISSION_ROLE).insert(module_permission_roles);
      }
      await trx.commit();
      return response;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }

  async create(role: Record<string, any>, keys: string[]): Promise<Role[]> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    try {
      const module_permissions: IdsInput[] = role.permissions;
      delete role.permissions;
      role.created_on = getCurrentTimeStamp();
      role.updated_on = getCurrentTimeStamp();
      const response = await trx(TABLE.ROLE).insert(role, keys);
      if (module_permissions) {
        const module_permission_roles = module_permissions.map(module_permission => {
          return {
            role_id: response[0].id || response[0],
            module_permission_id: module_permission['id'],
          };
        });
        const parentModulePermissions = await this.getParentModules(module_permissions.map(mp => mp.id));
        parentModulePermissions.map(parentModulePermission => {
          module_permission_roles.push({
            role_id: response[0].id || response[0],
            module_permission_id: parentModulePermission['id'],
          })
        });
        await trx(TABLE.MODULE_PERMISSION_ROLE).insert(module_permission_roles, ['module_permission_id']);
      }
      await trx.commit();
      return response;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }

  async getViewPermission(): Promise<any> {
    const permission = await this._connection(TABLE.PERMISSION)
    .select(['id', 'record_type'])
    .where({record_type: 'view'})
    .first();
    return permission['id'];
  }

  // this function returns the module_permission_ids of parent modules with view permission
  async getParentModules(module_permission_ids: string[]): Promise<any> {
    const subQuery = this._connection(TABLE.MODULE)
    .distinct(['parent_id'])
    .leftJoin(TABLE.MODULE_PERMISSION,`${TABLE.MODULE}.id`,`${TABLE.MODULE_PERMISSION}.module_id`)
    .whereIn(`${TABLE.MODULE_PERMISSION}.id`, module_permission_ids);

    const condition = {};
    condition['permission_id'] = await this.getViewPermission();
    return this._connection(TABLE.MODULE_PERMISSION)
      .select(['id', 'permission_id'])
      .where(condition)
      .whereIn('module_id', subQuery)
  }
}
