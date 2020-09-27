import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { LeavesController } from './leaves.controller';
import { LeavesService } from './leaves.service';

@Module({
  imports: [GqlClientModule],
  controllers: [LeavesController],
  providers: [LeavesService, GqlClientService],
})
export class LeaveModule {}
