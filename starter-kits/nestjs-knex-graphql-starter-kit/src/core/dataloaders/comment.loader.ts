import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { CommentRepository } from '@rubix/core/repository/';
import { Comment } from '@rubix/app/v1/comments/comment.model';

@Injectable()
export class CommentLoader implements NestDataLoader<string, Comment> {
  constructor(private readonly commentDB: CommentRepository) {}
  generateDataLoader(): DataLoader<string, Comment> {
    return new DataLoader<string, Comment>(postIDs =>
      this.commentDB.findByPostIdsLoader(postIDs),
    );
  }
}