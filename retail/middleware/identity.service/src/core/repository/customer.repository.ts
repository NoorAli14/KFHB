import { Injectable } from '@nestjs/common';
import {TABLE, SESSION_STATUSES} from '@rubix/common/constants';
import { BaseRepository } from './base.repository';
import {CustomersFilterParams} from "@app/v1/customers/dtos";
import {QueryBuilder} from "knex";
import {PaginationParams, SortingParam} from "@common/dtos";

@Injectable()
export class CustomerRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.CUSTOMER}.id`,
    `${TABLE.CUSTOMER}.session_id`,
  ];

  constructor() {
    super(TABLE.CUSTOMER);
  }

  async list(paginationParams: PaginationParams,
             filteringParams: CustomersFilterParams,
             sortingParams: SortingParam,
             condition: Record<string, any>,
             output: string[]): Promise<any> {
    const countQuery: QueryBuilder = this.getFilteredQuery(this.connection(this.tableName).where(condition), filteringParams);
    const dataQuery: QueryBuilder = this.getFilteredQuery(this.connection(this.tableName).where(condition), filteringParams);
    return super.listWithPagination(countQuery, dataQuery, paginationParams, sortingParams, output)
  }

  getFilteredQuery(query: QueryBuilder, filteringParams: CustomersFilterParams): QueryBuilder {
    if(filteringParams.national_id_no) query = query.where('national_id_no', 'like', `%${filteringParams.national_id_no}%`);
    if(filteringParams.gender) query = query.where('gender', 'like', `%${filteringParams.gender}%`);
    if(filteringParams.nationality) query = query.where('nationality', 'like', `%${filteringParams.nationality}%`);
    if(filteringParams.first_name) query = query.where('first_name', 'like', `%${filteringParams.first_name}%`);
    if(filteringParams.last_name) query = query.where('last_name', 'like', `%${filteringParams.last_name}%`);
    if(filteringParams.status) query = query.where('status','=', filteringParams.status);
    if(filteringParams.contact_no) query = query.where('contact_no', 'like', `%${filteringParams.contact_no}%`);
    if(filteringParams.email) query = query.where('email', 'like', `%${filteringParams.email}%`);
    if(filteringParams.created_on)
      query = query.whereBetween('created_on', [filteringParams.created_on.start, filteringParams.created_on.end]);
    return query;
  }

  async findByIdAndTenentId(
    id: string,
    tenant_id: string,
    columns?: string[],
  ): Promise<any> {
    return this.connection(this.tableName)
      .select(columns || this.__attributes)
      .where({ id, tenant_id, deleted_on: null })
      .first();
  }

  async getRecentSession(tenant_id: string, customer_id: string): Promise<any> {
    const condition: { [key: string]: any } = {};
    condition[`${TABLE.SESSION}.customer_id`] = customer_id;
    condition[`${TABLE.CUSTOMER}.tenant_id`] = tenant_id;
    condition[`${TABLE.SESSION}.status`] = SESSION_STATUSES.ACTIVE;
    condition[`${TABLE.SESSION}.deleted_on`] = null;
    condition[`${TABLE.CUSTOMER}.deleted_on`] = null;

    return this.connection(this.tableName)
      .select([
        ...this.__attributes,
        `${TABLE.SESSION}.target_user_id`,
        `${TABLE.SESSION}.check_id`,
        `${TABLE.SESSION}.fido_reg_req_id`,
      ])
      .innerJoin(
        TABLE.SESSION,
        `${TABLE.SESSION}.id`,
        `${TABLE.CUSTOMER}.session_id`,
      )
      .where(condition)
      .orderBy(`${TABLE.SESSION}.created_on`, 'desc')
      .first();
  }
}
