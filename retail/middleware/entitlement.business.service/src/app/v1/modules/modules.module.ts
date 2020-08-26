import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModuleService } from './modules.service';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

@Module({
  imports: [GqlClientModule],
  controllers: [ModulesController],
  providers: [ModulesController, ModuleService, GqlClientService],
})
export class ModuleModule {}
