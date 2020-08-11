import { Module } from '@nestjs/common';
import { TemplatesResolver } from './templates.resolver';

import { TemplatesService } from './templates.service';
import { RepositoryModule } from 'src/core/repository/repository.module';
import { TemplateLoader } from './template.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [RepositoryModule],
  providers: [
    TemplatesService,
    TemplatesResolver,
    TemplateLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class TemplatesModule {}
