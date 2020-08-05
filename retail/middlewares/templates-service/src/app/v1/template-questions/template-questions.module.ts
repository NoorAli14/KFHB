import { Module } from '@nestjs/common';
import { TemplateQuestionsService } from './template-questions.service';
import { TemplateQuestionsResolver } from './template-questions.resolver';
import { RepositoryModule } from '@core/repository/repository.module';
import { TemplateQuestionsRepository } from '@core/repository/template-questions.repository';
import { TemplateQuestionLoader } from './template-question.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [RepositoryModule],
  providers: [
    TemplateQuestionsService,
    TemplateQuestionsRepository,
    TemplateQuestionsResolver,
    TemplateQuestionLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class TemplateQuestionsModule {}
