import { Module } from "@nestjs/common";
import {RepositoryModule} from "@core/repository/repository.module";
import {LeavesService} from "@app/v1/leave/leaves.service";
import {LeavesResolver} from "@app/v1/leave/leaves.resolver";
import {LeaveRepository} from "@core/repository/leave.repository";

@Module({
  imports: [RepositoryModule],
  providers: [
    LeavesService,
    LeavesResolver,
    LeaveRepository],
})
export class LeavesModule {}
