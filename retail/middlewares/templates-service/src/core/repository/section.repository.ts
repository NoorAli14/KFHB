import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class SectionRepository extends BaseRepository {
  constructor() {
    super(TABLE.SECTION);
  }
  async findByTemplateQuestionId(id: string, keys?: string[]): Promise<any> {
    return this._connection(this._tableName)
      .select(keys)
      .join(
        TABLE.TEMPLATE_QUESTIONS,
        `${this._tableName}.id`,
        '=',
        `${TABLE.TEMPLATE_QUESTIONS}.section_id`,
      )
      .where(`${TABLE.TEMPLATE_QUESTIONS}.id`, id);
  }
}
