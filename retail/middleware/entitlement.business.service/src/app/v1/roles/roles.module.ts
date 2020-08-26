import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RoleService } from './roles.service';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

@Module({
  imports: [GqlClientModule],
  controllers: [RolesController],
  providers: [RolesController, RoleService, GqlClientService],
})
export class RolesModule {}
