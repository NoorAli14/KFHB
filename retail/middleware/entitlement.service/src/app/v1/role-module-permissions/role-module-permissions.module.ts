import { Module } from "@nestjs/common";

import { RepositoryModule } from "src/core/repository/repository.module";
import {RoleModulePermissionsService} from "@app/v1/role-module-permissions/role-module-permissions.service";
import {RoleModulePermissionRepository} from "@core/repository/role-module-permission.repository";
import {RoleModulePermissionsResolver} from "@app/v1/role-module-permissions/role-module-permissions.resolver";

@Module({
  imports: [RepositoryModule],
  providers: [RoleModulePermissionsService, RoleModulePermissionRepository, RoleModulePermissionsResolver],
})
export class RoleModulePermissionsModule {}
