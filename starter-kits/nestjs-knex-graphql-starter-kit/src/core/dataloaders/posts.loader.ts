import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { PostRepository } from '@rubix/core/repository/';
import { PostGQL } from '@rubix/app/v1/posts/post.model';

@Injectable()
export class PostLoader implements NestDataLoader<string, PostGQL> {
  constructor(private readonly postDB: PostRepository) {}
  generateDataLoader(): DataLoader<string, PostGQL> {
    return new DataLoader<string, PostGQL>(userIDs =>
      this.postDB.findByUserIds(userIDs),
    );
  }
}