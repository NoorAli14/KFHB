import { Module,  } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import {
  ModulesDataLoader,
  PermissionsDataLoader,
  SubModulesDataLoader, RolesDataLoader
} from './';
import {RepositoryModule} from "@core/repository/repository.module";

const loaders: any = [RolesDataLoader, ModulesDataLoader, SubModulesDataLoader, PermissionsDataLoader];

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
