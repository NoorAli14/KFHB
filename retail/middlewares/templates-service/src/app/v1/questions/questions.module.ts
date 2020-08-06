import { Module, forwardRef } from '@nestjs/common';
import { QuestionsResolver } from './questions.resolver';
import { QuestionsService } from './questions.service';
import { QuestionRepository } from '@core/repository/question.repository';
import { QuestionLoader } from './question.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { RepositoryModule } from '@core/repository/repository.module';
import { OptionsModule } from '@app/v1/options/options.module';
import { OptionLoader } from '../options/option.loader';

@Module({
  imports: [RepositoryModule, OptionsModule],
  exports: [QuestionLoader],
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
export class QuestionsModule {
  constructor(private readonly optionLoader: OptionLoader) {}
}
