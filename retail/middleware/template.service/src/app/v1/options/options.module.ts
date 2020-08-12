import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionRepository } from '@core/repository/option.repository';
import { OptionsResolver } from './options.resolver';
import { OptionLoader } from './option.loader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { RepositoryModule } from '@core/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [
    OptionsService,
    OptionRepository,
    OptionsResolver,
    OptionLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class OptionsModule {}
