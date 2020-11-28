import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { SystemAuditLogController } from './system-audit-log.controller';
import { SystemAuditLogService } from './system-audit-log.service';

@Module({
  imports: [GqlClientModule],
  controllers: [SystemAuditLogController],
  providers: [SystemAuditLogController, SystemAuditLogService, GqlClientService],
})
export class SystemAuditLogModule {}
