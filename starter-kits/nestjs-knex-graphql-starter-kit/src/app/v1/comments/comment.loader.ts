import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { CommentsService } from './comments.service';
import { CommentGQL } from './comment.model';

@Injectable()
export class CommentLoader implements NestDataLoader<string, CommentGQL> {
  constructor(private readonly commentService: CommentsService) {}
  generateDataLoader(): DataLoader<string, CommentGQL> {
    return new DataLoader<string, CommentGQL>(postIDs =>
      this.commentService.findByPostIds(postIDs),
    );
  }
}