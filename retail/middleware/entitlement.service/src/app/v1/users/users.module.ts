import { Module } from "@nestjs/common";

import { RepositoryModule } from "@core/repository/repository.module";
import { UserRepository } from "@core/repository/user.repository";
import { Encrypter } from "@common/encrypter";
import { UsersResolver } from "./users.resolver";
import { UserService } from "./users.service";

@Module({
  imports: [RepositoryModule],
  providers: [
      UserService,
      UserRepository,
      UsersResolver,
      Encrypter,
  ],
})
export class UsersModule {}
