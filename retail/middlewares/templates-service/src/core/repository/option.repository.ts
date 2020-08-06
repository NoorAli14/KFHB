import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class OptionRepository extends BaseRepository {
  constructor() {
    super(TABLE.OPTION);
  }

  async findByQuestionId(question_id: string, keys?: string[]): Promise<any> {
    super.findBy({ question_id: question_id }, keys);
  }
}
