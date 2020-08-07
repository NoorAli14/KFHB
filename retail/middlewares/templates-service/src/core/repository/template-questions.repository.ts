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
    const query: QueryBuilder = this._connection(this._tableName);

    if (keys.hasOwnProperty('joins')) {
      keys['joins'].forEach(element => {
        query.join(
          TABLE[element.toUpperCase()],
          // TODO!: Following the Convention, Can be replaced with the Decorator 'Column Name'.
          `${this._tableName}.${element}_id`,
          '=',
          `${TABLE[element.toUpperCase()]}.id`,
        );
      });
    }
    query.select(keys);

    return query;
  }

  async findOne(condition: Record<string, any>, keys?: string[]): Promise<any> {
    return this._connection(this._tableName)
      .select(keys)
      .where(condition)
      .first();
  }
}
