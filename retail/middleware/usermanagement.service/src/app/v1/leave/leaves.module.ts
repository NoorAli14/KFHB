import { Module } from '@nestjs/common';
import { RepositoryModule } from '@core/repository/repository.module';
import { LeavesService } from '@app/v1/leave/leaves.service';
import { LeavesResolver } from '@app/v1/leave/leaves.resolver';
import { LeaveRepository } from '@core/repository/leave.repository';
import { UserService } from '@app/v1/users/users.service';
import { Encrypter } from '@common/encrypter';
import { HolidaysService } from '@app/v1/holiday/holidays.service';
import { WorkingDaysService } from '@app/v1/working-days/working-days.service';
import { LeaveTypeService } from '@app/v1/leave_type/leave_type.service';
import { SystemAuditLogService } from '@app/v1/system-audit-log/system-audit-log.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    LeavesService,
    LeavesResolver,
    LeaveRepository,
    UserService,
    Encrypter,
    HolidaysService,
    WorkingDaysService,
    LeaveTypeService,
    SystemAuditLogService,
  ],
})
export class LeavesModule {}
