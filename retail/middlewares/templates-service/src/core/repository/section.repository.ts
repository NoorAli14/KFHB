import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class SectionRepository extends BaseRepository {
  constructor() {
    super(TABLE.SECTION);
  }
  async findByTemplateQuestionId(ids: readonly string[], keys?: string[]): Promise<any> {
    return this._connection(this._tableName)
      .select(keys || `${this._tableName}.*`)
      .join(
        TABLE.TEMPLATE_QUESTIONS,
        `${this._tableName}.id`,
        '=',
        `${TABLE.TEMPLATE_QUESTIONS}.section_id`,
      )
      .whereIn(`${TABLE.TEMPLATE_QUESTIONS}.id`, ids);
  }
}
