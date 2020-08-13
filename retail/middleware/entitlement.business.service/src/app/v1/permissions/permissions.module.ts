import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionService } from './permissions.service';

@Module({
  imports: [],
  controllers: [PermissionsController],
  providers: [PermissionsController, PermissionService],
})
export class PermissionModule {}
