import { Module } from '@nestjs/common';
import { RepositoryModule } from '@core/repository/repository.module';
import { LeaveTypeService } from '@app/v1/leave_type/leave_type.service';
import { Leave_typeResolver } from '@app/v1/leave_type/leave_type.resolver';
import { LeaveTypeRepository } from '@core/repository/leave_type.repository';

@Module({
  imports: [RepositoryModule],
  providers: [LeaveTypeService, Leave_typeResolver, LeaveTypeRepository],
})
export class Leave_typeModule {}
