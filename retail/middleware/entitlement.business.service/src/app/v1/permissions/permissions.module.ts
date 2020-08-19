import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionService } from './permissions.service';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

@Module({
  imports: [GqlClientModule],
  controllers: [PermissionsController],
  providers: [PermissionsController, PermissionService, GqlClientService],
})
export class PermissionModule {}
