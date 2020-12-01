import { Module } from '@nestjs/common';

import { RepositoryModule } from '@core/repository/repository.module';
import { SystemAuditLogService } from '@app/v1/system-audit-log/system-audit-log.service';
import { SystemAuditLogRepository } from '@core/repository';
import { SystemAuditLogResolver } from '@app/v1/system-audit-log/system-audit-log.resolver';

@Module({
  imports: [RepositoryModule],
  providers: [
    SystemAuditLogService,
    SystemAuditLogRepository,
    SystemAuditLogResolver,
  ],
})
export class SystemAuditLogModule {}
