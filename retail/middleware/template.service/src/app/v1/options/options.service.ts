import { Injectable } from '@nestjs/common';
import { OptionRepository } from '@core/repository/option.repository';
import { groupBy, values } from 'lodash';

@Injectable()
export class OptionsService {
  constructor(private optionDB: OptionRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.optionDB.list(keys);
  }
  async findById(id: string, keys?: string[]): Promise<any> {
    return this.optionDB.findOne({ id: id }, keys);
  }
  async findByIds(ids: readonly string[]): Promise<any> {
    return this.optionDB.findByIds(ids);
  }

  async findByQuestionId(questionIDs: readonly string[]): Promise<any> {
    const options = await this.optionDB.findByQuestionId(questionIDs);
    // Grouping the Records using the Master table ID,
    // Then Converting the Groupby Dictionary into Array to make it compatible with Dataloader
    return questionIDs.map(
      question_id => groupBy(options, 'question_id')[question_id],
    );
  }
}
