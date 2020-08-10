import { Module } from '@nestjs/common';
import { TemplateQuestionsService } from './template-questions.service';
import { TemplateQuestionsResolver } from './template-questions.resolver';
import { RepositoryModule } from '@core/repository/repository.module';
import { TemplateQuestionsRepository } from '@core/repository/template-questions.repository';
import { TemplateLoader } from '../templates/template.loader';
import { SectionLoader } from '../sections/section.loader';
import { QuestionLoader } from '../questions/question.loader';
import { TemplatesService } from '../templates/templates.service';
import { QuestionsService } from '../questions/questions.service';
import { SectionsService } from '../sections/sections.service';
import { TemplateRepository, QuestionRepository, OptionRepository } from '@core/repository';
import { SectionRepository } from '@core/repository/section.repository';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { OptionLoader } from '../options/option.loader';
import { OptionsService } from '../options/options.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    TemplateQuestionsResolver,
    // Repositories
    TemplateQuestionsRepository,
    TemplateRepository,
    SectionRepository,
		QuestionRepository,
		OptionRepository,
    // Services
    TemplateQuestionsService,
    TemplatesService,
    SectionsService,
		QuestionsService,
		OptionsService,
    // Loaders
    TemplateLoader,
    SectionLoader,
    QuestionLoader,
    OptionLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class TemplateQuestionsModule {}
