import { Injectable } from '@nestjs/common';
import {
  TABLE,
  DOCUMENT_STATUSES,
  DOCUMENT_TYPE_STATUSES,
  SESSION_STATUSES,
} from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class SessionReferenceRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    `${TABLE.SESSION_REFERENCE}.id`,
    `${TABLE.SESSION_REFERENCE}.tenant_id`,
    `${TABLE.SESSION_REFERENCE}.session_id`,
    `${TABLE.SESSION_REFERENCE}.document_type_id`,
    `${TABLE.SESSION_REFERENCE}.attachable_id`,
    `${TABLE.SESSION_REFERENCE}.processed_data`,
    `${TABLE.SESSION_REFERENCE}.status`,
    `${TABLE.SESSION_REFERENCE}.created_on`,
    `${TABLE.SESSION_REFERENCE}.created_by`,
    `${TABLE.SESSION_REFERENCE}.updated_on`,
    `${TABLE.SESSION_REFERENCE}.updated_by`,
  ];

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

  async recentDocumentByType(
    session_id: string | string[],
    document_type: string | string[],
  ): Promise<any> {
    document_type = Array.isArray(document_type)
      ? document_type
      : [document_type];
    const __session_id: string[] = Array.isArray(session_id)
      ? session_id
      : [session_id];

    const condition: { [key: string]: any } = {};
    condition[`${TABLE.SESSION}.status`] = SESSION_STATUSES.ACTIVE;
    condition[`${TABLE.DOCUMENT_TYPE}.status`] = DOCUMENT_TYPE_STATUSES.ACTIVE;
    condition[`${TABLE.SESSION_REFERENCE}.deleted_on`] = null;
    condition[`${TABLE.SESSION}.deleted_on`] = null;

    let query: any = this.connection(this.tableName)
      .select([
        ...this.__attributes,
        `${TABLE.SESSION}.target_user_id`,
        `${TABLE.SESSION}.check_id`,
        `${TABLE.DOCUMENT_TYPE}.name`,
      ])
      .innerJoin(
        TABLE.DOCUMENT_TYPE,
        `${TABLE.DOCUMENT_TYPE}.id`,
        `${TABLE.SESSION_REFERENCE}.document_type_id`,
      )
      .innerJoin(
        TABLE.SESSION,
        `${TABLE.SESSION}.id`,
        `${TABLE.SESSION_REFERENCE}.session_id`,
      )
      .where(condition)
      .whereIn(`${TABLE.DOCUMENT_TYPE}.name`, document_type)
      .whereIn(`${TABLE.SESSION_REFERENCE}.session_id`, __session_id)
      .whereNot(`${TABLE.SESSION_REFERENCE}.status`, DOCUMENT_STATUSES.ARCHIVED)
      .orderBy(`${TABLE.SESSION_REFERENCE}.created_on`, 'desc');

    if (!Array.isArray(session_id) && !Array.isArray(document_type))
      query = query.first();
    return query;
  }

  async getDocumentByCustomerAndId(
    customer_id: string,
    id: string,
  ): Promise<any> {
    const condition: { [key: string]: any } = {};

    condition[`${TABLE.SESSION}.customer_id`] = customer_id;
    condition[`${TABLE.SESSION_REFERENCE}.id`] = id;
    condition[`${TABLE.SESSION}.status`] = SESSION_STATUSES.ACTIVE;
    condition[`${TABLE.DOCUMENT_TYPE}.status`] = DOCUMENT_TYPE_STATUSES.ACTIVE;
    condition[`${TABLE.SESSION_REFERENCE}.deleted_on`] = null;
    condition[`${TABLE.SESSION}.deleted_on`] = null;

    return this.connection(this.tableName)
      .select([
        ...this.__attributes,
        `${TABLE.SESSION}.target_user_id`,
        `${TABLE.SESSION}.check_id`,
        `${TABLE.DOCUMENT_TYPE}.name`,
      ])
      .innerJoin(
        TABLE.DOCUMENT_TYPE,
        `${TABLE.DOCUMENT_TYPE}.id`,
        `${TABLE.SESSION_REFERENCE}.document_type_id`,
      )
      .innerJoin(
        TABLE.SESSION,
        `${TABLE.SESSION}.id`,
        `${TABLE.SESSION_REFERENCE}.session_id`,
      )
      .where(condition)
      .whereNot(`${TABLE.SESSION_REFERENCE}.status`, DOCUMENT_STATUSES.ARCHIVED)
      .orderBy(`${TABLE.SESSION_REFERENCE}.created_on`, 'desc')
      .first();
  }
}
