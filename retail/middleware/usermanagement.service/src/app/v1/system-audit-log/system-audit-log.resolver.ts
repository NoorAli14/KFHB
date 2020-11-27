import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Loader } from 'nestjs-dataloader';
import * as DataLoader from "dataloader";

import { CurrentUser, Fields } from '@common/decorators';
import { ICurrentUser } from '@common/interfaces';
import { PaginationParams, SortingParam } from '@common/dtos';
import { SALWithPagination, SystemAuditLog } from './system-audit-log.model';
import { SALFilterParams } from './dtos';
import { SystemAuditLogService } from './system-audit-log.service';
import { SystemAuditLogInput } from "./system-audit-log.dto";
import { UserForSAL } from "@app/v1/users/user.model";

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

  @Mutation(() => SystemAuditLog)
  async addSystemAuditLog(
    @Args('input') input: SystemAuditLogInput,
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<SystemAuditLog> {
    return this.systemAuditLogService.create(currentUser.tenant_id, input, output);
  }

  @ResolveField('user', () => UserForSAL)
  async getUser(
    @Parent() sal: SystemAuditLog,
    @Loader('UsersDataLoader')
      usersLoader: DataLoader<UserForSAL['id'], UserForSAL[]>,
  ): Promise<any> {
    if (!sal.user_id) return {};
    const [res] = await usersLoader.load(sal.user_id);
    return res;
  }
}
