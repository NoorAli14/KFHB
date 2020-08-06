import { Injectable } from '@nestjs/common';
import { TemplateRepository } from '@core/repository';

@Injectable()
export class TemplatesService {
  constructor(private templateDB: TemplateRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.templateDB.list(keys);
  }
  async findById(id: string, keys?: string[]): Promise<any> {
    return this.templateDB.findOne({ id: id }, keys);
  }
  async findByIds(ids: readonly string[]): Promise<any> {
    return this.templateDB.findByIds(ids);
  }

  async findByTemplateQuestionId(ids: readonly string[]): Promise<any> {
    return this.templateDB.findByTemplateQuestionId(ids[0]);
  }
}
