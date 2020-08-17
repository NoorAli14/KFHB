import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class QuestionRepository extends BaseRepository {
  constructor() {
    super(TABLE.QUESTION);
  }

  async findBySectionId(section_ids: readonly string[], keys?: string[]): Promise<any> {
    return this._connection(this._tableName)
      .select(keys || `${this._tableName}.*`)
      .whereIn(`section_id`, section_ids);
  }
}
