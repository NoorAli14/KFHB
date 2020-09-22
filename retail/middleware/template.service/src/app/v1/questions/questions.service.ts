import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '@core/repository/question.repository';
import { groupBy } from 'lodash';

@Injectable()
export class QuestionsService {
  constructor(private questionDB: QuestionRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.questionDB.list(keys);
  }
  async findById(id: string, keys?: string[]): Promise<any> {
    return this.questionDB.findOne({ id: id }, keys);
  }
  async findByIds(ids: readonly string[], keys?: string[]): Promise<any> {
    return this.questionDB.findByIds(ids, keys);
  }

  async findByIdsSorted(ids: readonly string[], keys?: string[]): Promise<any> {
    return await this.questionDB.findByIds(ids, keys, true);
  }

  async findBySectionId(
    section_ids: readonly string[],
    keys?: string[],
  ): Promise<any> {
    //TODO
    const questions = await this.questionDB.findBySectionId(section_ids, keys);
    // Grouping the Records using the Master table ID,
    // Then Converting the Groupby Dictionary into Array to make it compatible with Dataloader
    return section_ids.map(
      section_id => groupBy(questions, 'section_id')[section_id],
    );
  }
}
