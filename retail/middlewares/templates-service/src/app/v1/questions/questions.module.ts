import { Module } from '@nestjs/common';
import { QuestionsResolver } from './questions.resolver';
import { QuestionsService } from './questions.service';
import { QuestionRepository } from '@core/repository/question.repository';
import { QuestionLoader } from './question.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [QuestionsModule],
  exports: [QuestionsService, QuestionRepository, QuestionLoader],
  providers: [
    QuestionsResolver,
    QuestionsService,
    QuestionRepository,
    QuestionLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class QuestionsModule {}
