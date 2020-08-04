import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { RepositoryModule } from '@core/repository/repository.module';
import { PostRepository, CommentRepository } from '@core/repository/';
import { UserService } from '@app/v1/users/users.service';
import { CommentsService } from '@app/v1/comments/comments.service';
import { PostLoader } from './posts.loader';
import { UserLoader } from '../users/user.loader';
import { CommentLoader } from '../comments/comment.loader';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [RepositoryModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostRepository,
    CommentRepository,
    PostsResolver,
    UserService,
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
export class PostModule {}
