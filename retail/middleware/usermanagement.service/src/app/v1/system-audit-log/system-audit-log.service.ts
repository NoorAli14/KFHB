import { Injectable } from '@nestjs/common';

import { ICurrentUser } from '@common/interfaces';
import { PaginationParams, SortingParam } from '@common/dtos';
import { CreatedOnStartShouldBeLessThanEndException } from '@common/exceptions';
import { SALFilterParams } from './dtos';
import {
  SALWithPagination,
  SystemAuditLog,
} from '@app/v1/system-audit-log/system-audit-log.model';
import { SystemAuditLogRepository } from '@core/repository/';
import { SystemAuditLogInput } from '@app/v1/system-audit-log/system-audit-log.dto';

@Injectable()
export class SystemAuditLogService {
  constructor(private systemAuditLogRepository: SystemAuditLogRepository) {}

  async list(
    current_user: ICurrentUser,
    paginationParams: PaginationParams,
    filteringParams: SALFilterParams,
    sortingParams: SortingParam,
    output: string[],
  ): Promise<SALWithPagination> {
    if (
      filteringParams?.created_on &&
      new Date(filteringParams?.created_on.start).getTime() >
        new Date(filteringParams?.created_on.end).getTime()
    ) {
      throw new CreatedOnStartShouldBeLessThanEndException(
        filteringParams?.created_on.start,
        filteringParams?.created_on.end,
      );
    }
    const condition = { tenant_id: current_user.tenant_id };
    return this.systemAuditLogRepository.list(
      paginationParams,
      filteringParams,
      sortingParams,
      condition,
      output,
    );
  }

  async create(
    tenant_id: string,
    newObj: SystemAuditLogInput,
    output?: string[],
  ): Promise<SystemAuditLog> {
    newObj['tenant_id'] = tenant_id;
    const [result] = await this.systemAuditLogRepository.create(newObj, output);
    return result;
  }
}
