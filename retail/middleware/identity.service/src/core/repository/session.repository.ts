import { Injectable } from '@nestjs/common';
import { TABLE, SESSION_STATUSES } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class SessionRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    'id',
    'check_id',
    'target_user_id',
    'fido_reg_req_id',
  ];
  constructor() {
    super(TABLE.SESSION);
  }

  async create(args: { [key: string]: any }, columns: string[], trx?: any) {
    await this.markAsArchived(args.customer_id, trx);
    return super.create(args, columns, trx);
  }
  async findById(id: string, columns?: string[]): Promise<any> {
    return super.findOne(
      { id, deleted_on: null, status: SESSION_STATUSES.ACTIVE },
      columns || this.__attributes,
    );
  }

  async markAsArchived(customer_id: string, trx?: any): Promise<any> {
    return super.update({ customer_id: customer_id }, { status: SESSION_STATUSES.ARCHIVED, updated_by: customer_id }, ['id'], trx
    )
  }
}