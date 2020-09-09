import { Injectable } from '@nestjs/common';
import { TABLE } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    'id',
    'session_id',
    'target_user_id',
  ];
  constructor() {
    super(TABLE.CUSTOMER);
  }

  async findByIdAndTenentId(
    id: string,
    tenant_id: string,
    columns?: string[],
  ): Promise<any> {
    return this.connection(this.tableName)
      .select(columns || this.__attributes)
      .where({ id, tenant_id, deleted_on: null })
      .first();
  }
}
