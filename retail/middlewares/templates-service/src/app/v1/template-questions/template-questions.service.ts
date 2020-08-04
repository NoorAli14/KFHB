import { Injectable } from '@nestjs/common';
import { TemplateQuestionsRepository } from '@core/repository/template-questions.repository';

@Injectable()
export class TemplateQuestionsService {
  constructor(private templateQuestionsDB: TemplateQuestionsRepository) {}

  async list(keys: string[]): Promise<any> {
		return this.templateQuestionsDB.list(keys);
  }
  async findById(id: string, keys?: string[]): Promise<any> {
    return this.templateQuestionsDB.findOne({ id: id }, keys);
  }
}
