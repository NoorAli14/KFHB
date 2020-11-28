import { Module } from '@nestjs/common';
import { RepositoryModule } from '@core/repository/repository.module';
import { HolidaysService } from '@app/v1/holiday/holidays.service';
import { HolidaysResolver } from '@app/v1/holiday/holidays.resolver';
import { HolidayRepository } from '@core/repository/holiday.repository';

@Module({
  imports: [RepositoryModule],
  providers: [HolidaysService, HolidaysResolver, HolidayRepository],
})
export class HolidaysModule {}
