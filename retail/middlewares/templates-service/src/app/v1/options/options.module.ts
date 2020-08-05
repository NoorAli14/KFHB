import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionRepository } from '@core/repository/option.repository';
import { OptionsResolver } from './options.resolver';
import { OptionLoader } from './option.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { QuestionLoader } from '../questions/question.loader';
import { QuestionsService } from '../questions/questions.service';
import { QuestionRepository } from '@core/repository/question.repository';

@Module({
  imports: [OptionsModule],
  providers: [
    OptionsService,
    OptionRepository,
    OptionsResolver,
    OptionLoader,
    QuestionLoader,
    QuestionsService,
    QuestionRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class OptionsModule {}
