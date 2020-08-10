import { Module } from '@nestjs/common';
import { TemplateResponsesService } from './template-responses.service';
import { TemplateResponsesRepository } from '../../../core/repository/template-responses.repository';
import { TemplateResponsesResolver } from './template-responses.resolver';

@Module({
  imports: [],
  providers: [
    TemplateResponsesService,
    TemplateResponsesRepository,
    TemplateResponsesResolver,
  ],
})
export class TemplateResponsesModule {}
