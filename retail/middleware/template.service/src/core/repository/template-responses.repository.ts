import { QueryBuilder } from 'knex';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class TemplateResponsesRepository extends BaseRepository {
  constructor() {
    super(TABLE.TEMPLATE_RESPONSE);
  }

  async list(keys: string | string[]): Promise<any> {
    const query: QueryBuilder = this._connection(this._tableName).select(keys);

    return query;
  }

  async findOne(condition: Record<string, any>, keys?: string[]): Promise<any> {
    return this._connection(this._tableName)
      .select(keys)
      .where(condition)
      .first();
  }
}
