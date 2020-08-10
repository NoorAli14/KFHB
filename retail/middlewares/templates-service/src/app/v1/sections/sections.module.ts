import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionRepository } from '@core/repository/section.repository';
import { SectionsResolver } from './sections.resolver';
import { SectionLoader } from './section.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { RepositoryModule } from '@core/repository/repository.module';

@Module({
  imports: [RepositoryModule],
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
