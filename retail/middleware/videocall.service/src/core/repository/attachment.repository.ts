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
        attachment_id: args.attachment_id,
      },
      { status: STATUS.ARCHIVED },
      ['id', 'status'],
      trx,
    );
    return super.create(args, columns, trx);
  }
}
