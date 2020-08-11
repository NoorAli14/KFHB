import { Injectable } from '@nestjs/common';
import { SectionRepository } from '@core/repository/section.repository';

@Injectable()
export class SectionsService {
  constructor(private sectionDB: SectionRepository) {}

  async list(keys: string[]): Promise<any> {
    return this.sectionDB.list(keys);
  }
  async findById(id: string, keys?: string[]): Promise<any> {
    return this.sectionDB.findOne({ id: id }, keys);
  }
  async findByIds(ids: readonly string[]): Promise<any> {
    return this.sectionDB.findByIds(ids);
  }

  async findByTemplateQuestionId(ids: readonly string[]): Promise<any> {
    return this.sectionDB.findByTemplateQuestionId(ids);
  }
}
