import { Module } from '@nestjs/common';

import {Encrypter} from "@common/encrypter";
import {UserService} from "@app/v1/users/users.service";
import {LoginResolver} from "@app/v1/login/login.resolver";
import {LoginService} from "@app/v1/login/login.service";
import {UsersModule} from "@app/v1/users/users.module";
import {RepositoryModule} from "@core/repository/repository.module";
import {UserRepository} from "@core/repository";

@Module({
  imports: [UsersModule, RepositoryModule],
  providers: [
      UserService,
      LoginResolver,
      LoginService,
      Encrypter,
      UserRepository],
})
export class LoginModule {}