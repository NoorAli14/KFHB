import { Module } from '@nestjs/common';
import { TemplatesResolver } from './templates.resolver';

import { TemplatesService } from './templates.service';
import { RepositoryModule } from 'src/core/repository/repository.module';
import { TemplateRepository } from 'src/core/repository/template.repository';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { TemplateLoader } from './template.loader';

@Module({
  imports: [RepositoryModule],
  providers: [
    TemplatesService,
    TemplateRepository,
    TemplatesResolver,
    TemplateLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class TemplatesModule {}
