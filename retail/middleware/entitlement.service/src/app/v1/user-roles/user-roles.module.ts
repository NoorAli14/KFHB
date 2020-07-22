import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/core/repository/repository.module';
import {UserRolesService} from "@app/v1/user-roles/user-roles.service";
import {UserRoleRepository} from "@core/repository/user-role.repository";
import {UserRolesResolver} from "@app/v1/user-roles/user-roles.resolver";

@Module({
  imports: [RepositoryModule],
  providers: [UserRolesService, UserRoleRepository, UserRolesResolver],
})
export class UserRolesModule {}
