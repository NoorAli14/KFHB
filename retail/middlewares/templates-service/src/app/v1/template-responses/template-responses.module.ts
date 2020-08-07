import { Module } from '@nestjs/common';
import { TemplateResponsesService } from './template-responses.service';
import { TemplateResponsesRepository } from '../../../core/repository/template-responses.repository';
import { TemplateResponsesResolver } from './template-responses.resolver';
import { TemplateResponseLoader } from './template-response.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [],
  providers: [
    TemplateResponsesService,
    TemplateResponsesRepository,
    TemplateResponsesResolver,
    TemplateResponseLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class TemplateResponsesModule {}
