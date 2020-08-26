import { Injectable } from '@nestjs/common';
import { TABLE } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class CommentRepository extends BaseRepository {
  constructor() {
    super(TABLE.COMMENT);
  }

  async findByPostIdsLoader(postIDs: readonly string[]): Promise<any> {
    const comments: any = await this.connection
      .table(this.tableName)
      .whereIn('post_id', postIDs)
      .select('*');
      const commentLookups = {};
      comments.forEach(comment => {
        if (!commentLookups[comment.post_id]) {
          commentLookups[comment.post_id] = [];
        }
        commentLookups[comment.post_id].push(comment);
      });
      return postIDs.map(postID => commentLookups[postID]);
  }
}
