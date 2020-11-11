import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { PostRepository } from '@rubix/core/repository/';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [RepositoryModule],
  providers: [PostsService, PostRepository, PostsResolver],
})
export class PostModule {}
