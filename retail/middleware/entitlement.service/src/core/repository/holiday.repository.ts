import { Injectable } from "@nestjs/common";

import { BaseRepository } from "./base.repository";
import { TABLE } from "@common/constants";
import {PaginationParams, SortingParam} from "@common/classes";
import {QueryBuilder} from "knex";
import {HolidaysFilterParams} from "@app/v1/holiday/classes";

@Injectable()
export class HolidayRepository extends BaseRepository {
  constructor() {
    super(TABLE.HOLIDAY);
  }

  async list(paginationParams: PaginationParams,
             filteringParams: HolidaysFilterParams,
             sortingParams: SortingParam,
             condition: Record<string, any>,
             output: string[]): Promise<any> {
    const countQuery: QueryBuilder = this.getFilteredQuery(this.connection(this.tableName).where(condition), filteringParams);
    const dataQuery: QueryBuilder = this.getFilteredQuery(this.connection(this.tableName).where(condition), filteringParams);
    return super.listWithPagination(countQuery, dataQuery, paginationParams, sortingParams, output)
  }

  getFilteredQuery(query: QueryBuilder, filteringParams: HolidaysFilterParams): QueryBuilder {
    if(filteringParams.description) query = query.where('description', 'like', `%${filteringParams.description}%`);
    if(filteringParams.remarks) query = query.where('remarks', 'like', `%${filteringParams.remarks}%`);
    if(filteringParams.status) query = query.where('status','=', filteringParams.status);
    if(filteringParams.holiday_date) query = query.where('holiday_date','=', filteringParams.holiday_date);
    if(filteringParams.created_on)
      query = query.whereBetween('created_on', [filteringParams.created_on.start, filteringParams.created_on.end]);
    return query;
  }
}
