import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';
@Injectable()
export class OptionRepository extends BaseRepository {
  columns: string[] = ['id', 'name', 'question_id', 'created_on', 'updated_on'];
  constructor() {
    super(TABLE.OPTION);
  }
  async findByQuestionId(questionIDs: string[]): Promise<any> {
    return this.connection
      .table(this.tableName)
      .whereIn('question_id', questionIDs)
      .select(this.columns);
  }
}
