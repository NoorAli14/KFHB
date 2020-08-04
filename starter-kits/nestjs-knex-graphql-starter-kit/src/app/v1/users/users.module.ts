import { Module } from '@nestjs/common';
import { RepositoryModule } from '@core/repository/repository.module';
import { UserRepository } from '@core/repository/user.repository';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { PostLoader } from '@app/v1/posts/posts.loader';
import { UserLoader } from './user.loader';
import { CommentLoader } from '../comments/comment.loader';
import { PostsService } from '@app/v1/posts/posts.service';
import { CommentsService } from '@app/v1/comments/comments.service';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
@Module({
  imports: [RepositoryModule],
  controllers: [UsersController],
  providers: [
    UserService,
    UserRepository,
    UsersResolver,
    PostsService,
    CommentsService,
    PostLoader,
    UserLoader,
    CommentLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    }
  ],
})
export class UsersModule {}
