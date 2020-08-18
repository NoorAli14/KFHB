import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';
@Injectable()
export class OptionRepository extends BaseRepository {
  constructor() {
    super(TABLE.OPTION);
  }
  async findByQuestionId(
    questionIDs: readonly string[],
    keys?: string[],
  ): Promise<any> {
    return this.connection(this._tableName)
      .select(keys || `${this._tableName}.*`)
      .whereIn('question_id', questionIDs);
  }
}
