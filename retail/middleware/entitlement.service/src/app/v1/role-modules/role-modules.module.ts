import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/core/repository/repository.module';
import {RoleModulesService} from "@app/v1/role-modules/role-modules.service";
import {RoleModuleRepository} from "@core/repository/role-module.repository";
import {RoleModulesResolver} from "@app/v1/role-modules/role-modules.resolver";

@Module({
  imports: [RepositoryModule],
  providers: [RoleModulesService, RoleModuleRepository, RoleModulesResolver],
})
export class RoleModulesModule {}
