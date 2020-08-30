import { Injectable } from '@nestjs/common';
import { TABLE } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerRepository extends BaseRepository {
  constructor() {
    super(TABLE.CUSTOMER);
  }

  async findByIdAndTenentId(
    id: string,
    tenant_id: string,
    columns?: string[],
  ): Promise<any> {
    columns = columns || ['id', 'session_id', 'target_user_id'];
    return this.connection(this.tableName)
      .select(columns)
      .where({ id, tenant_id, deleted_on: null })
      .first();
  }
}
