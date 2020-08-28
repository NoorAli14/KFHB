import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModuleService } from './modules.service';
import { GqlClientModule, GqlClientService } from '@common/index';

@Module({
  imports: [GqlClientModule],
  controllers: [ModulesController],
  providers: [ModulesController, ModuleService, GqlClientService],
})
export class ModuleModule {}
