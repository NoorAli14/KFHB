import { Module } from "@nestjs/common";

import { RepositoryModule } from "@core/repository/repository.module";
import { UserRepository } from "@core/repository/user.repository";
import { Encrypter } from "@common/encrypter";
import { UsersResolver } from "./users.resolver";
import { UserService } from "./users.service";
import {HolidaysService} from '@app/v1/holiday/holidays.service';
import {LeavesService} from '@app/v1/leave/leaves.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    UserService,
    UserRepository,
    UsersResolver,
    Encrypter,
    HolidaysService,
    LeavesService
  ],
})
export class UsersModule {}
