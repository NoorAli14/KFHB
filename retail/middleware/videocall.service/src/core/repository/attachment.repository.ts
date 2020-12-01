import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { STATUS, TABLE } from '@common/constants';
@Injectable()
export class AttachmentRepository extends BaseRepository {
  constructor() {
    super(TABLE.ATTACHMENT);
  }
  async create(args: { [key: string]: any }, columns: string[], trx?: any) {
    await super.update(
      {
        customer_id: args.customer_id,
        attachment_type: args.attachment_type,
      },
      { status: STATUS.ARCHIVED },
      ['id', 'status'],
      trx,
    );
    return super.create(args, columns, trx);
  }
}
