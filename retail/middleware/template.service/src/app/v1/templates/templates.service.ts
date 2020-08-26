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

  async findByIds(ids: readonly string[], keys?: string[]): Promise<any> {
    return this.templateDB.findByIds(ids, keys);
  }

  async findByIdsSorted(ids: readonly string[], keys?: string[]): Promise<any> {
    return this.templateDB.findByIds(ids, keys, true);
  }

  async findByName(name: string, keys?: string[]): Promise<any> {
    return this.templateDB.findOne({ name: name }, keys);
  }
}
