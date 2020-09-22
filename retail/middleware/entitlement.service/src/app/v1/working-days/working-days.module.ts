import { Module } from "@nestjs/common";
import {RepositoryModule} from "@core/repository/repository.module";
import {WorkingDaysService} from "@app/v1/working-days/working-days.service";
import {WorkingDaysResolver} from "@app/v1/working-days/working-days.resolver";
import {WorkingDaysRepository} from "@core/repository";

@Module({
  imports: [RepositoryModule],
  providers: [
    WorkingDaysService,
    WorkingDaysResolver,
    WorkingDaysRepository],
})
export class WorkingDaysModule {}
