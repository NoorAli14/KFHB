import { Module } from '@nestjs/common';
import { QuestionsResolver } from './questions.resolver';
import { QuestionsService } from './questions.service';
import { QuestionRepository } from '@core/repository/question.repository';
import { OptionRepository } from '@core/repository/option.repository';
import { QuestionLoader } from './question.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { RepositoryModule } from '@core/repository/repository.module';
import { OptionLoader } from '../options/option.loader';
import { OptionsService } from '../options/options.service';
@Module({
  imports: [RepositoryModule],
  providers: [
    QuestionsResolver,
    QuestionsService,
    QuestionRepository,
    OptionRepository,
    OptionsService,
    QuestionLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class QuestionsModule {
  constructor(private readonly optionLoader: OptionLoader) {}
}
