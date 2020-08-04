import { Module } from '@nestjs/common';
import { RepositoryModule } from '@core/repository/repository.module';
import { CommentRepository } from '@core/repository/';
import { CommentsService } from '@app/v1/comments/comments.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  exports: [CommentRepository],
  providers: [CommentRepository, CommentsService, {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    }],
})
export class CommentsModule {}
