import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";

import { UserService } from "./users.service";
import { RepositoryModule } from "src/core/repository/repository.module";
import { UserRepository } from "src/core/repository/user.repository";
import { Encrypter } from "@common/encrypter";
import { RoleService } from "@app/v1/roles/roles.service";
import { RolesModule } from "@app/v1/roles/roles.module";
import {ModulesDataLoaderByUser, RolesDataLoader} from "@core/dataloaders";
import {ModuleService} from "@app/v1/modules/module.service";
import {ModuleModule} from "@app/v1/modules/module.module";
import {LeavesService} from "@app/v1/leave/leaves.service";
import {LeavesDataLoader} from "@core/dataloaders/leaves.dataloader";

@Module({
  imports: [RepositoryModule, RolesModule, ModuleModule],
  providers: [
      UserService,
      UserRepository,
      UsersResolver,
      Encrypter,
      RolesDataLoader,
      RoleService,
      ModulesDataLoaderByUser,
      ModuleService,
      LeavesService,
      LeavesDataLoader],
})
export class UsersModule {}
