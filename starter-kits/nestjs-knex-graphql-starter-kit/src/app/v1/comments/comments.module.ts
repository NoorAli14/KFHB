import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { CommentRepository } from '@rubix/core/repository/';
import { CommentsService } from '@rubix/app/v1/comments/comments.service';
import { CommentsResolver } from '@rubix/app/v1/comments/comments.resolver';

@Module({
  imports: [RepositoryModule],
  providers: [CommentRepository, CommentsService, CommentsResolver],
})
export class CommentsModule {}
