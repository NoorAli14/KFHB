import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class PostRepository extends BaseRepository {
  columns: string[] = ['id', 'user_id', 'description', 'created_on', 'updated_on'];
  constructor() {
    super(TABLE.POST);
  }

  async findByUserIds(userIDs: string[]): Promise<any> {
    return this.connection
      .table(this.tableName)
      .whereIn('user_id', userIDs)
      .select(this.columns);
  }
}
