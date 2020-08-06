import { Injectable } from '@nestjs/common';
import { OptionRepository } from '@core/repository/option.repository';

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

  async findByQuestionId(ids: readonly string[]): Promise<any> {
    return this.optionDB.findByQuestionId(ids[0]);
  }
}
