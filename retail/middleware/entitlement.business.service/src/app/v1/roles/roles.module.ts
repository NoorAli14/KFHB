import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import {RoleService} from './roles.service';
@Module({
  imports: [],
  controllers: [RolesController],
  providers: [RolesController, RoleService],
})
export class RolesModule {}
