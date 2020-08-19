import { Module } from "@nestjs/common";
import {RepositoryModule} from "@core/repository/repository.module";
import {WorkingWeekResolver} from "@app/v1/working-week/working-week.resolver";
import {WorkingWeekService} from "@app/v1/working-week/working-week.service";
import {WorkingWeekRepository} from "@core/repository/working-week.repository";

@Module({
  imports: [RepositoryModule],
  providers: [
    WorkingWeekResolver,
    WorkingWeekRepository,
    WorkingWeekService],
})
export class WorkingWeekModule {}
