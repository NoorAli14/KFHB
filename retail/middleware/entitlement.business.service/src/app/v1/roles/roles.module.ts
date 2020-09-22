import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { RolesController } from './roles.controller';
import { RoleService } from './roles.service';

@Module({
  imports: [GqlClientModule],
  controllers: [RolesController],
  providers: [RolesController, RoleService, GqlClientService],
})
export class RolesModule {}
