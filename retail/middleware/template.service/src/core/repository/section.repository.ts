import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class SectionRepository extends BaseRepository {
  constructor() {
    super(TABLE.SECTION);
  }
  async findByQuestionId(question_id: string, keys?: string[]): Promise<any> {
    // TODO: Improve the Query
    return this._connection(this._tableName)
      .select(keys || `${this._tableName}.*`)
      .join(
        TABLE.QUESTION,
        `${this._tableName}.id`,
        '=',
        `${TABLE.QUESTION}.section_id`,
      )
      .where(`${TABLE.QUESTION}.id`, question_id);
  }

  async findByTemplateId(
    template_ids: readonly string[],
    keys?: string[],
  ): Promise<any> {
    return this._connection(this._tableName)
      .select(keys || `${this._tableName}.*`)
      .whereIn('template_id', template_ids);
  }
}
