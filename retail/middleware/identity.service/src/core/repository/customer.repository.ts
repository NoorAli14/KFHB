import { Injectable } from '@nestjs/common';
import {TABLE, SESSION_STATUSES, NUMBERS} from '@rubix/common/constants';
import { BaseRepository } from './base.repository';
import {PaginationModel} from "@common/models";
import {ICustomerQueryParams} from "@app/v1/customers/interfaces";

@Injectable()
export class CustomerRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.CUSTOMER}.id`,
    `${TABLE.CUSTOMER}.session_id`,
  ];

  constructor() {
    super(TABLE.CUSTOMER);
  }

  async listWithPagination(queryParams: ICustomerQueryParams,
                           keys: string | string[],
                           condition: Record<string, any>): Promise<any> {
    const perPage = queryParams.limit;
    const currentPage = queryParams.page;
    const pagination: PaginationModel = {};
    const limitPerPage = (perPage || NUMBERS.DEFAULT_PAGE_SIZE) > 100 ? 100 : (perPage || NUMBERS.DEFAULT_PAGE_SIZE);
    const page = Math.max(currentPage || 1, 1);
    const offset = (page - 1) * limitPerPage;
    const query_total = this.connection(this.tableName).where(condition).count('id as count').first();
    const total = await this.getFilteredQuery(query_total, queryParams);
    const query_rows = this.connection(this.tableName).where(condition).offset(offset).limit(limitPerPage).orderBy('created_on', 'desc');
    const rows = await this.getFilteredQuery(query_rows, queryParams);
    const count = parseInt(String(total.count), 10);
    pagination.total = count;
    pagination.pages = Math.ceil(count / limitPerPage);
    pagination.perPage = limitPerPage;
    pagination.current = page;
    pagination.next = page + 1 > pagination.pages ? null : page + 1;
    pagination.prev = page - 1 < 1 ? null : page - 1;
    pagination.isFirst = pagination.current == 1;
    pagination.isLast = pagination.current == pagination.pages;
    return {pagination: pagination, data: rows};
  }

  getFilteredQuery(query: any, queryParams: ICustomerQueryParams): any{
    if(queryParams.national_id_no) query = query.where('national_id_no', 'like', `%${queryParams.national_id_no}%`);
    if(queryParams.gender) query = query.where('gender', 'like', `%${queryParams.gender}%`);
    if(queryParams.nationality) query = query.where('nationality', 'like', `%${queryParams.nationality}%`);
    if(queryParams.first_name) query = query.where('first_name', 'like', `%${queryParams.first_name}%`);
    if(queryParams.last_name) query = query.where('last_name', 'like', `%${queryParams.last_name}%`);
    if(queryParams.status) query = query.where('status', 'like', `%${queryParams.status}%`);
    if(queryParams.contact_no) query = query.where('contact_no', 'like', `%${queryParams.contact_no}%`);
    if(queryParams.email) query = query.where('email', 'like', `%${queryParams.email}%`);
    if(queryParams.created_on_start) {
      query = query.where('created_on', '>', queryParams.created_on_start);
      query = query.where('created_on', '<', queryParams.created_on_end);
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
