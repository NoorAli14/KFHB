import { Resolver, Query, Args } from '@nestjs/graphql';

import { CurrentUser, Fields } from '@common/decorators';
import { ICurrentUser } from '@common/interfaces';
import { PaginationParams, SortingParam } from '@common/dtos';
import { SALWithPagination, SystemAuditLog } from './system-audit-log.model';
import { SALFilterParams } from './dtos';
import { SystemAuditLogService } from './system-audit-log.service';

@Resolver(SystemAuditLog)
export class SystemAuditLogResolver {
  constructor(private readonly systemAuditLogService: SystemAuditLogService) {}

  @Query(() => SALWithPagination)
  async systemAuditLogList(
    @Fields() output: string[],
    @Args('pagination', { nullable: true }) paginationParams: PaginationParams,
    @Args('filters', { nullable: true }) filteringParams: SALFilterParams,
    @Args('sort_by', { nullable: true }) sortingParams: SortingParam,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<SALWithPagination> {
    return this.systemAuditLogService.list(
      currentUser,
      paginationParams,
      filteringParams,
      sortingParams,
      output,
    );
  }
}
