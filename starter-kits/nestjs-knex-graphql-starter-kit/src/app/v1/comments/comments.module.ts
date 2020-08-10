import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { CommentRepository } from '@rubix/core/repository/';
import { CommentsService } from '@rubix/app/v1/comments/comments.service';

@Module({
  imports: [RepositoryModule],
  controllers: [],
  exports: [CommentRepository],
  providers: [CommentRepository, CommentsService],
})
export class CommentsModule {}
