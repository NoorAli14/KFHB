import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { PostsService } from './posts.service';
import { PostGQL } from './post.model';

@Injectable()
export class PostLoader implements NestDataLoader<string, PostGQL> {
  constructor(private readonly postsService: PostsService) {}
  generateDataLoader(): DataLoader<string, PostGQL> {
    return new DataLoader<string, PostGQL>(keys =>
      this.postsService.findByUserIds(keys),
    );
  }
}