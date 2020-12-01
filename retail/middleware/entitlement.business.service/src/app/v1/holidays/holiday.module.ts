import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { HolidaysController } from './holidays.controller';
import { HolidaysService } from './holidays.service';

@Module({
  imports: [GqlClientModule],
  controllers: [HolidaysController],
  providers: [HolidaysService, GqlClientService],
})
export class HolidayModule {}
