import { Module } from '@nestjs/common';
import { TemplatesResolver } from './templates.resolver';
import { TemplatesService } from './templates.service';
import { TemplateRepository } from '@core/repository';

@Module({
  imports: [],
  providers: [TemplatesService, TemplatesResolver, TemplateRepository],
})
export class TemplatesModule {}
