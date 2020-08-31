import { Injectable } from '@nestjs/common';
import { TABLE, DOCUMENT_STATUSES } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class SessionReferenceRepository extends BaseRepository {
  constructor() {
    super(TABLE.SESSION_REFERENCE);
  }

  async create(args: { [key: string]: any }, columns: string[], trx?: any) {
    await super.update(
      { session_id: args.session_id, document_type_id: args.document_type_id },
      { status: DOCUMENT_STATUSES.ARCHIVED },
      ['id', 'status'],
      trx,
    );
    return super.create(args, columns, trx);
  }
}
