import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { PermissionsController } from './permissions.controller';
import { PermissionService } from './permissions.service';

@Module({
  imports: [GqlClientModule],
  controllers: [PermissionsController],
  providers: [PermissionsController, PermissionService, GqlClientService],
})
export class PermissionModule {}
