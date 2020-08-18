import { Module } from "@nestjs/common";

import { RepositoryModule } from "src/core/repository/repository.module";
import {ModuleService} from "@app/v1/modules/module.service";
import {ModuleRepository} from "@core/repository/module.repository";
import {ModuleResolver} from "@app/v1/modules/module.resolver";
import {PermissionService} from "@app/v1/permissions/permissions.service";
import {PermissionsModule} from "@app/v1/permissions/permissions.module";
import {PermissionsDataLoader, SubModulesDataLoader} from "@core/dataloaders";

@Module({
  imports: [RepositoryModule, PermissionsModule],
  providers: [ModuleService,
    ModuleRepository,
    ModuleResolver,
    SubModulesDataLoader,
    PermissionsDataLoader,
    PermissionService],
})
export class ModuleModule {}
