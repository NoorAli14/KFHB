import { Module } from '@nestjs/common';

import { RepositoryModule } from '@core/repository/repository.module';
import { UserRepository } from '@core/repository/user.repository';
import { Encrypter } from '@common/encrypter';
import { UserService } from '@app/v1/users/users.service';
import { UsersResolver } from '@app/v1/users/users.resolver';
import { HolidaysService } from '@app/v1/holiday/holidays.service';
import { LeavesService } from '@app/v1/leave/leaves.service';
import { WorkingDaysService } from '@app/v1/working-days/working-days.service';
import { SystemAuditLogService } from '@app/v1/system-audit-log/system-audit-log.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    UserService,
    UserRepository,
    UsersResolver,
    Encrypter,
    HolidaysService,
    LeavesService,
    WorkingDaysService,
    SystemAuditLogService,
  ],
})
export class UsersModule {}
