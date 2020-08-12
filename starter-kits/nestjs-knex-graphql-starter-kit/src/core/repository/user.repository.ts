import { Injectable } from '@nestjs/common';
import { TABLE } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository {
  constructor() {
    super(TABLE.USER);
  }
  async findByIdsLoader(ids: readonly string[]): Promise<any> {
     const users: any = await this.connection
      .table(this.tableName)
      .whereIn('id', ids)
      .select();
      const userLookups = {};
      users.forEach(user => {
        if (!userLookups[user.id]) {
          userLookups[user.id] = user;
        }
      });
      return ids.map(id => userLookups[id]);
  }
}
