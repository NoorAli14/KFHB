import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/core/repository/repository.module';
import { RoleService } from '@app/v1/roles/roles.service';
import { RoleRepository } from '@core/repository/role.repository';
import { RolesResolver } from '@app/v1/roles/roles.resolver';

@Module({
  imports: [RepositoryModule],
  providers: [RoleService, RoleRepository, RolesResolver],
})
export class RolesModule {}
