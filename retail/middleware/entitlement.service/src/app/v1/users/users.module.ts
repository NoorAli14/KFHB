import { Module } from "@nestjs/common";

import { RepositoryModule } from "@core/repository/repository.module";
import { UserRepository } from "@core/repository/user.repository";
import { Encrypter } from "@common/encrypter";
import { RoleService } from "@app/v1/roles/roles.service";
import { RolesModule } from "@app/v1/roles/roles.module";
import {ModuleService} from "@app/v1/modules/module.service";
import {ModuleModule} from "@app/v1/modules/module.module";
import {LeavesService} from "@app/v1/leave/leaves.service";
import { UsersResolver } from "./users.resolver";
import { UserService } from "./users.service";

@Module({
  imports: [RepositoryModule, RolesModule, ModuleModule],
  providers: [
      UserService,
      UserRepository,
      UsersResolver,
      Encrypter,
      RoleService,
      ModuleService,
      LeavesService
  ],
})
export class UsersModule {}
