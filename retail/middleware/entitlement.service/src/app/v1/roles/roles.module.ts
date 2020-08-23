import { Module } from "@nestjs/common";

import { RepositoryModule } from "src/core/repository/repository.module";
import {RoleService} from "@app/v1/roles/roles.service";
import {RoleRepository} from "@core/repository/role.repository";
import {RolesResolver} from "@app/v1/roles/roles.resolver";
import {ModuleModule} from "@app/v1/modules/module.module";
import {ModuleService} from "@app/v1/modules/module.service";
import {PermissionsModule} from "@app/v1/permissions/permissions.module";
import {PermissionService} from "@app/v1/permissions/permissions.service";
import {ModulesDataLoader, PermissionsDataLoader} from "@core/dataloaders";

@Module({
  imports: [RepositoryModule, ModuleModule, PermissionsModule],
  providers: [RoleService,
    RoleRepository,
    RolesResolver,
    ModulesDataLoader,
    ModuleService,
    PermissionsDataLoader,
    PermissionService],
})
export class RolesModule {}
