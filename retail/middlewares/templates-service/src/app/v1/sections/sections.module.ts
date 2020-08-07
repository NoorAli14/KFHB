import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionRepository } from '@core/repository/section.repository';
import { SectionsResolver } from './sections.resolver';
import { SectionLoader } from './section.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [],
  providers: [
    SectionsService,
    SectionRepository,
    SectionsResolver,
    SectionLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class SectionsModule {}
