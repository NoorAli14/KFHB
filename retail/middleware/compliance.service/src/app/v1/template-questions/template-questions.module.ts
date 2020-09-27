import { Module } from '@nestjs/common';
import { TemplateQuestionsService } from './template-questions.service';
import { TemplateQuestionsResolver } from './template-questions.resolver';
import { TemplateQuestionsRepository } from '@core/repository';

@Module({
  imports: [],
  providers: [
    TemplateQuestionsResolver,
    TemplateQuestionsRepository,
    TemplateQuestionsService,
  ],
})
export class TemplateQuestionsModule {}
