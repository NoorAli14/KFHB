import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { DocumentDataLoader, DocumentLoader } from './document.loader';
const loaders: any = [DocumentDataLoader, DocumentLoader];

@Module({
  imports: [RepositoryModule],
  providers: [
    ...loaders,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  exports: [...loaders],
})
export class DataloaderModule {}
