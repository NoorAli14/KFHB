import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModuleService } from './modules.service';
@Module({
  imports: [],
  controllers: [ModulesController],
  providers: [ModulesController, ModuleService],
})
export class ModuleModule {}
