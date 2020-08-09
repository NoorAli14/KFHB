import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { CommentRepository } from '@rubix/core/repository/';
import { CommentGQL } from '@rubix/app/v1/comments/comment.model';

@Injectable()
export class CommentLoader implements NestDataLoader<string, CommentGQL> {
  constructor(private readonly commentDB: CommentRepository) {}
  generateDataLoader(): DataLoader<string, CommentGQL> {
    return new DataLoader<string, CommentGQL>(postIDs =>
      this.commentDB.findByPostIdsLoader(postIDs),
    );
  }
}