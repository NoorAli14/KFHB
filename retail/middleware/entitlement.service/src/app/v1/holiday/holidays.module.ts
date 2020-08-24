import { Module } from "@nestjs/common";
import {RepositoryModule} from "@core/repository/repository.module";
import {HolidaysService} from "@app/v1/holiday/Holidays.service";
import {HolidaysResolver} from "@app/v1/holiday/Holidays.resolver";
import {HolidayRepository} from "@core/repository/holiday.repository";


@Module({
  imports: [RepositoryModule],
  providers: [
    HolidaysService,
    HolidaysResolver,
    HolidayRepository],
})
export class HolidaysModule {}
