import { Module } from '@nestjs/common';
import { TemplatesResolver } from './templates.resolver';

import { TemplatesService } from './templates.service';
import { RepositoryModule } from 'src/core/repository/repository.module';
import { TemplateRepository } from 'src/core/repository/template.repository';

@Module({
  imports: [RepositoryModule],
  providers: [TemplatesService, TemplateRepository, TemplatesResolver],
})
export class TemplatesModule {}
