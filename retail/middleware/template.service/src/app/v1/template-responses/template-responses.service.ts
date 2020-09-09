import { Injectable } from '@nestjs/common';
import { TemplateResponsesRepository } from '@core/repository/template-responses.repository';
import { NewTemplateResponseInput } from './template-response.dto';

@Injectable()
export class TemplateResponsesService {
  constructor(
    private readonly templateResponsesDB: TemplateResponsesRepository,
  ) {}

  async list(keys: string[]): Promise<any> {
    return this.templateResponsesDB.list(keys);
  }

  async create(
    newTemplateResponse: NewTemplateResponseInput,
    keys?: string[],
  ): Promise<any> {
    const [response] = await this.templateResponsesDB.create(
      newTemplateResponse,
      keys,
    );
    return response;
  }

  async findByUserId(user_id: string, columns?: string[]): Promise<any> {
    return this.templateResponsesDB.findOne({ user_id: user_id }, columns);
  }

  async findByIds(ids: readonly string[]): Promise<any> {
    return this.templateResponsesDB.findByIds(ids);
  }
}
