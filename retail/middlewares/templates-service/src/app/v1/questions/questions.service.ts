import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '@core/repository/question.repository';

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
}
