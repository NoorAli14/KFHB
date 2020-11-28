import {
  Controller,
  Get, Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {AuthGuard, PaginationDTO, Permissions, PermissionsGuard, SortByDTO} from '@common/index';
import { SystemAuditLogService } from './system-audit-log.service';
import {SALPaginationList} from "./system-audit-log.entity";
import {SystemAuditLogFilterDto} from "./dtos";

@ApiTags('System Audit Logs')
@Controller('audit/system')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)

export class SystemAuditLogController {
  constructor(private readonly systemAuditLogService: SystemAuditLogService) { }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of System Audit Logs information with pagination.',
    summary: 'List of all System Audit Logs.',
  })
  @ApiOkResponse({ type: SALPaginationList, description: 'List of all System Audit Logs.' })
  @Permissions('view:system-audit-log')
  async list(@Query() pagination: PaginationDTO, @Query() filters: SystemAuditLogFilterDto, @Query() sort_by: SortByDTO): Promise<SALPaginationList> {
    return this.systemAuditLogService.list({ pagination, filters, sort_by });
  }
}
