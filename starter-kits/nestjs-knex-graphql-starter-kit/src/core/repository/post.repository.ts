import { Injectable } from '@nestjs/common';
import { TABLE } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class PostRepository extends BaseRepository {
  columns: string[] = [
    'id',
    'user_id',
    'description',
    'created_on',
    'updated_on',
  ];
  constructor() {
    super(TABLE.POST);
  }

  async findByUserIdsLoader(userIDs: readonly string[]): Promise<any> {
    const posts: any = await this.connection
      .table(this.tableName)
      .whereIn('user_id', userIDs)
      .select(this.columns);
    const postLookups = {};
    posts.forEach(post => {
      if (!postLookups[post.user_id]) {
        postLookups[post.user_id] = [];
      }
      postLookups[post.user_id].push(post);
    });
    return userIDs.map(userId => postLookups[userId]);
  }

  async findByIdsLoader(IDs: readonly string[]): Promise<any> {
    const posts: any = await this.connection
      .table(this.tableName)
      .whereIn('id', IDs)
      .select(this.columns);
    const postLookups = {};
    posts.forEach(post => {
      if (!postLookups[post.id]) {
        postLookups[post.id] = post;
      }
    });
    return IDs.map(id => postLookups[id]);
  }
}
