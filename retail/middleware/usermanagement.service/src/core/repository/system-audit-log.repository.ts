import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'knex';

import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';
import { PaginationParams, SortingParam } from '@common/dtos';
import { SALFilterParams } from '@app/v1/system-audit-log/dtos';

@Injectable()
export class SystemAuditLogRepository extends BaseRepository {
  constructor() {
    super(TABLE.SYSTEM_AUDIT_LOG);
  }

  async list(
    paginationParams: PaginationParams,
    filteringParams: SALFilterParams,
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
    filteringParams: SALFilterParams,
  ): QueryBuilder {
    let query: QueryBuilder = this._connection(this._tableName).where(
      condition,
    );
    if (filteringParams?.audit_code)
      query = query.where(
        'audit_code',
        'like',
        `%${filteringParams.audit_code}%`,
      );
    if (filteringParams?.audit_text)
      query = query.where(
        'audit_text',
        'like',
        `%${filteringParams.audit_text}%`,
      );
    if (filteringParams?.user_id)
      query = query.where('user_id', 'like', `%${filteringParams.user_id}%`);
    if (filteringParams?.created_on)
      query = query.whereBetween('created_on', [
        filteringParams.created_on?.start,
        filteringParams.created_on?.end,
      ]);
    return query;
  }
}
