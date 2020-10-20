import { Injectable } from '@nestjs/common';
import {TABLE, SESSION_STATUSES} from '@rubix/common/constants';
import { BaseRepository } from './base.repository';
import {CustomerQueryParams} from "@app/v1/customers/classes";
import {QueryBuilder} from "knex";

@Injectable()
export class CustomerRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.CUSTOMER}.id`,
    `${TABLE.CUSTOMER}.session_id`,
  ];

  constructor() {
    super(TABLE.CUSTOMER);
  }

  async list(query_params: CustomerQueryParams,
                           condition: Record<string, any>): Promise<any> {
    const query_count: QueryBuilder = this.getFilteredQuery(this.connection(this.tableName).where(condition), query_params);
    const query_data: QueryBuilder = this.getFilteredQuery(this.connection(this.tableName).where(condition), query_params);
    return super.listWithPagination(query_count, query_data, query_params)
  }

  getFilteredQuery(query: QueryBuilder, query_params: CustomerQueryParams): any {
    if(query_params.national_id_no) query = query.where('national_id_no', 'like', `%${query_params.national_id_no}%`);
    if(query_params.gender) query = query.where('gender', 'like', `%${query_params.gender}%`);
    if(query_params.nationality) query = query.where('nationality', 'like', `%${query_params.nationality}%`);
    if(query_params.first_name) query = query.where('first_name', 'like', `%${query_params.first_name}%`);
    if(query_params.last_name) query = query.where('last_name', 'like', `%${query_params.last_name}%`);
    if(query_params.status) query = query.where('status', query_params.status);
    if(query_params.contact_no) query = query.where('contact_no', 'like', `%${query_params.contact_no}%`);
    if(query_params.email) query = query.where('email', 'like', `%${query_params.email}%`);
    if(query_params.created_on_start && query_params.created_on_end) {
      query = query.whereBetween('created_on', [query_params.created_on_start, query_params.created_on_end]);
    }
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
