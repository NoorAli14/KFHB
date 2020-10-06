import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/core/repository/repository.module';
import { PermissionService } from '@app/v1/permissions/permissions.service';
import { PermissionRepository } from '@core/repository/permission.repository';
import { PermissionsResolver } from '@app/v1/permissions/permissions.resolver';

@Module({
  imports: [RepositoryModule],
  providers: [PermissionService, PermissionRepository, PermissionsResolver],
})
export class PermissionsModule {}
