import { Module } from '@nestjs/common';

import {Encrypter} from "@common/encrypter";
import {UsersModule} from "@app/v1/users/users.module";
import {ForgotPasswordResolver} from "@app/v1/forgot-password/forgot-password.resolver";
import {ForgotPasswordService} from "@app/v1/forgot-password/forgot-password.service";
import {RepositoryModule} from "@core/repository/repository.module";
import {UserRepository} from "@core/repository";

@Module({
  imports: [UsersModule, RepositoryModule],
  providers: [
    ForgotPasswordResolver,
    ForgotPasswordService,
    UserRepository,
    Encrypter,
  ],
})
export class ForgotPasswordModule {}
