import { Module } from '@nestjs/common';
import { TemplateQuestionsService } from './template-questions.service';
import { TemplateQuestionsResolver } from './template-questions.resolver';
import { RepositoryModule } from '@core/repository/repository.module';
import { TemplateQuestionsRepository } from '@core/repository/template-questions.repository';

@Module({
  imports: [RepositoryModule],
  providers: [TemplateQuestionsService, TemplateQuestionsRepository, TemplateQuestionsResolver],
})
export class TemplateQuestionsModule {}
