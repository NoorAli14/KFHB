import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { PostRepository } from '@rubix/core/repository/';
import { Post } from '@rubix/app/v1/posts/post.model';

@Injectable()
export class PostLoader implements NestDataLoader<string, Post> {

  constructor(private readonly postDB: PostRepository) {}
  
  generateDataLoader(): DataLoader<string, Post> {
    return new DataLoader<string, Post>(userIDs =>
      this.postDB.findByUserIdsLoader(userIDs),
    );
  }
}

@Injectable()
export class FindPostByIdLoader implements NestDataLoader<string, Post> {

  constructor(private readonly postDB: PostRepository) {}
  
  generateDataLoader(): DataLoader<string, Post> {
    return new DataLoader<string, Post>(userIDs =>
      this.postDB.findByIdsLoader(userIDs),
    );
  }
}