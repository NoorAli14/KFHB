import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

const loaders = [
];

@Module({
  // imports: [RepositoryModule],
  providers: [
    ...loaders,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
    // OptionsService,
  ],
  exports: loaders,
})
export class DataloaderModule {}
