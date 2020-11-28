import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';
import { PaginationParams, SortingParam } from '@common/dtos';
import { QueryBuilder } from 'knex';
import { HolidaysFilterParams } from '@app/v1/holiday/dtos';

@Injectable()
export class HolidayRepository extends BaseRepository {
  constructor() {
    super(TABLE.HOLIDAY);
  }

  async list(
    paginationParams: PaginationParams,
    filteringParams: HolidaysFilterParams,
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
    filteringParams: HolidaysFilterParams,
  ): QueryBuilder {
    let query: QueryBuilder = this._connection(this._tableName).where(
      condition,
    );
    if (filteringParams?.status)
      query = query.where('status', '=', filteringParams.status);
    if (filteringParams?.holiday_date)
      query = query.where('holiday_date', '=', filteringParams.holiday_date);
    if (filteringParams?.created_on)
      query = query.whereBetween('created_on', [
        filteringParams.created_on?.start,
        filteringParams.created_on?.end,
      ]);
    return query;
  }
}
