import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { STATUS, TABLE } from '@common/constants';
import { IdsInput } from '@common/inputs/ids.input';
import { User } from '@app/v1/users/user.model';
import { QueryBuilder } from 'knex';
import { UsersFilterParams } from '@app/v1/users/dtos';
import { PaginationParams, SortingParam } from '@common/dtos';

@Injectable()
export class UserRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.USER}.id`,
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
    `${TABLE.USER}.created_on`,
  ];

  constructor() {
    super(TABLE.USER);
  }

  async list(
    paginationParams: PaginationParams,
    filteringParams: UsersFilterParams,
    sortingParams: SortingParam,
    condition: Record<string, any>,
    output: string[],
  ): Promise<any> {
    let dataQuery: QueryBuilder = this.getQuery(condition, filteringParams);
    const countQuery: QueryBuilder = this.getQuery(condition, filteringParams);
    dataQuery = dataQuery.orderBy(
      sortingParams?.sort_by || 'created_on',
      sortingParams?.sort_order || 'desc',
    );
    return super.paginate(
      dataQuery,
      countQuery,
      paginationParams?.page,
      paginationParams?.limit,
      output,
    );
  }

  getQuery(
    condition: Record<string, any>,
    filteringParams: UsersFilterParams,
  ): QueryBuilder {
    let query: QueryBuilder = this._connection(this._tableName).where(
      condition,
    );
    if (filteringParams?.nationality_id)
      query = query.where(
        'nationality_id',
        'like',
        `%${filteringParams.nationality_id}%`,
      );
    if (filteringParams?.gender)
      query = query.where('gender', 'like', `%${filteringParams.gender}%`);
    if (filteringParams?.first_name)
      query = query.where(
        'first_name',
        'like',
        `%${filteringParams.first_name}%`,
      );
    if (filteringParams?.last_name)
      query = query.where(
        'last_name',
        'like',
        `%${filteringParams.last_name}%`,
      );
    if (filteringParams?.status)
      query = query.where('status', '=', filteringParams.status);
    if (filteringParams?.contact_no)
      query = query.where(
        'contact_no',
        'like',
        `%${filteringParams.contact_no}%`,
      );
    if (filteringParams?.email)
      query = query.where('email', 'like', `%${filteringParams.email}%`);
    if (filteringParams?.created_on)
      query = query.whereBetween('created_on', [
        filteringParams.created_on?.start,
        filteringParams.created_on?.end,
      ]);
    return query;
  }

  async update(
    condition: Record<string, any>,
    user: Record<string, any>,
    keys: string[],
  ): Promise<User[]> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    try {
      const roles: IdsInput[] = user.roles;
      delete user.roles;
      const response = await trx(TABLE.USER)
        .where(condition)
        .update(user, keys);
      if (roles?.length > 0) {
        const rolesToDelete = [];
        const newUserRoles = [];
        for (const role of roles) {
          role._deleted
            ? rolesToDelete.push(role.id)
            : newUserRoles.push(role.id);
        }
        // deleting user-roles
        if (rolesToDelete.length > 0)
          await trx(TABLE.USER_ROLE)
            .whereIn('role_id', rolesToDelete)
            .where({ user_id: response[0].id || response[0] })
            .del();
        // checking which of Ids already exist
        const idsAlready = await trx(TABLE.USER_ROLE)
          .select(['role_id'])
          .whereIn('role_id', newUserRoles)
          .where({ user_id: response[0].id || response[0] });
        // removing already existing Ids
        idsAlready.forEach(idObj => {
          newUserRoles.splice(newUserRoles.indexOf(idObj.role_id || idObj), 1);
        });
        // creating new user-roles
        const user_roles = newUserRoles.map(role_id => {
          return {
            user_id: response[0].id || response[0],
            role_id: role_id,
          };
        });
        if (user_roles.length > 0)
          await trx(TABLE.USER_ROLE).insert(user_roles, ['id']);
      }
      await trx.commit();
      return response;
    } catch (e) {
      await trx.rollback();
      throw e;
    }
  }

  async create(user: Record<string, any>, keys: string[]): Promise<User[]> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    try {
      const roles = user.roles;
      delete user.roles;
      const response = await trx(TABLE.USER).insert(user, keys);
      if (roles) {
        const user_roles = roles.map(role => {
          return {
            user_id: response[0].id || response[0],
            role_id: role['id'],
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

  async listExcludedUsers(
    userIds: string[],
    conditions: Record<string, any>,
  ): Promise<User[]> {
    conditions[`${TABLE.USER}.deleted_on`] = null;
    conditions[`${TABLE.ROLE}.deleted_on`] = null;
    conditions[`${TABLE.USER}.status`] = STATUS.ACTIVE;
    conditions[`${TABLE.ROLE}.status`] = STATUS.ACTIVE;
    return this._connection(TABLE.USER)
      .distinct(this.__attributes)
      .innerJoin(
        TABLE.USER_ROLE,
        `${TABLE.USER}.id`,
        `${TABLE.USER_ROLE}.user_id`,
      )
      .innerJoin(TABLE.ROLE, `${TABLE.USER_ROLE}.role_id`, `${TABLE.ROLE}.id`)
      .innerJoin(
        TABLE.MODULE_PERMISSION_ROLE,
        `${TABLE.ROLE}.id`,
        `${TABLE.MODULE_PERMISSION_ROLE}.role_id`,
      )
      .innerJoin(
        TABLE.MODULE_PERMISSION,
        `${TABLE.MODULE_PERMISSION_ROLE}.module_permission_id`,
        `${TABLE.MODULE_PERMISSION}.id`,
      )
      .innerJoin(
        TABLE.PERMISSION,
        `${TABLE.MODULE_PERMISSION}.permission_id`,
        `${TABLE.PERMISSION}.id`,
      )
      .whereNotIn(`${TABLE.USER}.id`, userIds)
      .where(conditions)
      .orderBy(`${TABLE.USER}.created_on`, 'desc');
  }

  async findByTenantIdAndEmail(
    tenantId: string,
    email: string,
    output?: string[],
  ): Promise<User> {
    const conditions = {
      email: email,
      tenant_id: tenantId,
      status: STATUS.ACTIVE,
      deleted_on: null,
    };
    return this.findOne(conditions, output);
  }

  async findByTenantIdAndToken(
    tenantId: string,
    password_reset_token: string,
    output?: string[],
  ): Promise<User> {
    const conditions = {
      password_reset_token: password_reset_token,
      tenant_id: tenantId,
      status: STATUS.ACTIVE,
      deleted_on: null,
    };
    return this.findOne(conditions, output);
  }

  async listUsersByIds(userIds: string[] | any): Promise<any> {
    return this._connection(TABLE.USER)
      .select(this.__attributes)
      .whereIn(`${TABLE.USER}.id`, userIds)
  }
}
