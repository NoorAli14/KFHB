import { Module,  } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
// import { } from './';

const loaders: any = [];

@Module({
  imports: [RepositoryModule],
  providers: [...loaders, {
    provide: APP_INTERCEPTOR,
    useClass: DataLoaderInterceptor,
  }],
  exports: [...loaders],
})
export class DataloaderModule {
}
