import { Module,  } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { UserRepository } from '@rubix/core/repository/';
import {UserLoader, PostLoader, CommentLoader } from "./"
@Module({
  imports: [
    RepositoryModule,  
  ],
  providers: [UserRepository,  UserLoader, PostLoader, CommentLoader,  {
    provide: APP_INTERCEPTOR,
    useClass: DataLoaderInterceptor,
  }],
  exports: [UserRepository, UserLoader, PostLoader, CommentLoader],
})
export class DataloaderModule {
}
