import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class CommentRepository extends BaseRepository {
  constructor() {
    super(TABLE.COMMENT);
  }

  async findByPostIds(postIDs: string[]): Promise<any> {
    return this.connection
      .table(this.tableName)
      .whereIn('post_id', postIDs)
      .select('*');
  }
}
