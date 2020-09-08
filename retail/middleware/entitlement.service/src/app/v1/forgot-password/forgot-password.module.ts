import { Module } from '@nestjs/common';

import {Encrypter} from "@common/encrypter";
import {UserService} from "@app/v1/users/users.service";
import {UsersModule} from "@app/v1/users/users.module";
import {ForgotPasswordResolver} from "@app/v1/forgot-password/forgot-password.resolver";
import {ForgotPasswordService} from "@app/v1/forgot-password/forgot-password.service";
import {RepositoryModule} from "@core/repository/repository.module";
import {UserRepository} from "@core/repository";
import {HolidaysService} from '@app/v1/holiday/holidays.service';
import {LeavesService} from '@app/v1/leave/leaves.service';

@Module({
  imports: [UsersModule, RepositoryModule],
  providers: [
    UserService,
    ForgotPasswordResolver,
    ForgotPasswordService,
    UserRepository,
    Encrypter,
    HolidaysService,
    LeavesService
  ],
})
export class ForgotPasswordModule {}
