import { Injectable } from '@nestjs/common';
import { TABLE, SESSION_STATUSES } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class SessionRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    'id',
    'check_id',
    'target_user_id',
  ];
  constructor() {
    super(TABLE.SESSION);
  }

  async findById(id: string, columns?: string[]): Promise<any> {
    return super.findOne(
      { id, deleted_on: null, status: SESSION_STATUSES.ACTIVE },
      columns || this.__attributes,
    );
  }
}
