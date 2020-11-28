import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { WorkingDaysController } from './working-days.controller';
import { WorkingDaysService } from './working-days.service';

@Module({
  imports: [GqlClientModule],
  controllers: [WorkingDaysController],
  providers: [WorkingDaysService, GqlClientService],
})
export class WorkingDayModule {}
