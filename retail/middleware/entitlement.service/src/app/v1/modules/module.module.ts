import { Module } from '@nestjs/common';

import { RepositoryModule } from '@core/repository/repository.module';
import { ModuleService } from '@app/v1/modules/module.service';
import { ModuleRepository } from '@core/repository/module.repository';
import { ModuleResolver } from '@app/v1/modules/module.resolver';

@Module({
  imports: [RepositoryModule],
  providers: [ModuleService, ModuleRepository, ModuleResolver],
})
export class ModuleModule {}
