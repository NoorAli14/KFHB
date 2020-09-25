import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

import {
  OptionLoaderForQuestion,
  QuestionLoaderForOption,
  QuestionLoaderForSection,
  QuestionLoaderForTemplateQuestion,
  SectionLoaderForQuestion,
  SectionLoaderForTemplate,
  SectionLoaderForTemplateQuestion,
  TemplateLoaderForSection,
  TemplateLoaderForTemplateQuestion,
} from '.';
import { OptionsService } from '@app/v1/options/options.service';
import { QuestionsService } from '@app/v1/questions/questions.service';
import { SectionsService } from '@app/v1/sections/sections.service';
import { TemplatesService } from '@app/v1/templates/templates.service';
import { RepositoryModule } from '@core/repository/repository.module';

const loaders = [
  OptionLoaderForQuestion,
  QuestionLoaderForOption,
  QuestionLoaderForSection,
  QuestionLoaderForTemplateQuestion,
  SectionLoaderForQuestion,
  SectionLoaderForTemplate,
  SectionLoaderForTemplateQuestion,
  TemplateLoaderForSection,
  TemplateLoaderForTemplateQuestion,
];

@Module({
  imports: [RepositoryModule],
  providers: [
    ...loaders,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    OptionsService,
    QuestionsService,
    SectionsService,
    TemplatesService,
    OptionsService,
  ],
  exports: loaders,
})
export class DataloaderModule {}
