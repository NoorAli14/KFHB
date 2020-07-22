import { QueryBuilder } from 'knex';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class TemplateQuestionsRepository extends BaseRepository {
  constructor() {
    super(TABLE.TEMPLATE_QUESTIONS);
  }

  async list(keys: string | string[]): Promise<any> {
    const query: QueryBuilder = this._connection(this._tableName)
      // .join(
      //   TABLE.TEMPLATE,
      //   `${this._tableName}.template_id`,
      //   '=',
      //   `${TABLE.TEMPLATE}.id`,
      // )
      // .join(
      //   TABLE.SECTION,
      //   `${this._tableName}.section_id`,
      //   '=',
      //   `${TABLE.SECTION}.id`,
      // )
      // .join(
      //   TABLE.QUESTION,
      //   `${this._tableName}.question_id`,
      //   '=',
      //   `${TABLE.QUESTION}.id`,
      // )
      .select(keys);

    return query;
  }

  async findOne(condition: Record<string, any>, keys?: string[]): Promise<any> {
    return this._connection(this._tableName)
      .select(keys)
      .where(condition)
      .first();
  }
}
