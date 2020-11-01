import { Injectable } from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import { TABLE } from "@common/constants";
import {Leave} from '@app/v1/leave/leave.model';
import {PaginationParams, SortingParam} from "@common/dtos";
import {QueryBuilder} from "knex";
import {LeavesFilterParams} from "@app/v1/leave/dtos";

@Injectable()
export class LeaveRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.LEAVE}.id`,
    `${TABLE.LEAVE}.user_id`,
    `${TABLE.LEAVE}.start_date`,
    `${TABLE.LEAVE}.end_date`,
    `${TABLE.LEAVE}.tenant_id`,
    `${TABLE.LEAVE}.remarks`,
    `${TABLE.LEAVE}.leave_type_id`,
    `${TABLE.LEAVE}.status`,
    `${TABLE.LEAVE}.created_on`,
    `${TABLE.LEAVE}.created_by`,
    `${TABLE.LEAVE}.updated_on`,
    `${TABLE.LEAVE}.updated_by`,
    `${TABLE.LEAVE}.deleted_on`,
    `${TABLE.LEAVE}.deleted_by`,
  ];

  constructor() {
    super(TABLE.LEAVE);
  }

  async list(paginationParams: PaginationParams,
             filteringParams: LeavesFilterParams,
             sortingParams: SortingParam,
             condition: Record<string, any>,
             output: string[]): Promise<any> {
    const countQuery: QueryBuilder = this.getFilteredQuery(this.connection(this.tableName).where(condition), filteringParams);
    const dataQuery: QueryBuilder = this.getFilteredQuery(this.connection(this.tableName).where(condition), filteringParams);
    return super.listWithPagination(countQuery, dataQuery, paginationParams, sortingParams, output)
  }

  getFilteredQuery(query: QueryBuilder, filteringParams: LeavesFilterParams): QueryBuilder {
    if(filteringParams.user_id) query = query.where('user_id', 'like', `%${filteringParams.user_id}%`);
    if(filteringParams.leave_type_id) query = query.where('leave_type_id', 'like', `%${filteringParams.leave_type_id}%`);
    if(filteringParams.status) query = query.where('status','=', filteringParams.status);
    if(filteringParams.start_date) query = query.where('start_date','=', filteringParams.start_date);
    if(filteringParams.end_date) query = query.where('end_date','=', filteringParams.end_date);
    if(filteringParams.created_on)
      query = query.whereBetween('created_on', [filteringParams.created_on.start, filteringParams.created_on.end]);
    return query;
  }

  async listLeavesByUserID(userIds: readonly string[]): Promise<Leave[]>{
    return this._connection(TABLE.LEAVE)
    .select(this.__attributes)
    .whereIn('user_id', userIds)
    .where({deleted_on : null})
    .orderBy('created_on', 'desc');
  }

  async findByDate(date: string, conditions: Record<string, any>, keys: string[]): Promise<Leave[]> {
    return this._connection(this._tableName)
    .select(keys)
    .where('start_date', '>=', date)
    .where('end_date', '<', date)
    .where(conditions);
  }
}
