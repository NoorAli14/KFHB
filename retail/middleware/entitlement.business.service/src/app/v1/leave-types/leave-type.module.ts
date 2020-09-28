import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { LeaveTypesController } from './leave-types.controller';
import { LeaveTypesService } from './leave-types.service';

@Module({
  imports: [GqlClientModule],
  controllers: [LeaveTypesController],
  providers: [LeaveTypesService, GqlClientService],
})
export class LeaveTypeModule {}
