import { Injectable } from '@nestjs/common';
import { TemplateResponsesRepository } from '@core/repository/template-responses.repository';
import { NewTemplateResponseInput } from './template-response.dto';
import { TemplateResponseGQL } from './template-response.model';

@Injectable()
export class TemplateResponsesService {
  constructor(
    private readonly templateResponsesDB: TemplateResponsesRepository,
  ) {}

  async list(keys: string[]): Promise<TemplateResponseGQL[]> {
    return this.templateResponsesDB.list(keys);
  }

  async create(
    newTemplateResponse: NewTemplateResponseInput,
    keys?: string[],
  ): Promise<TemplateResponseGQL> {
    const [response] = await this.templateResponsesDB.create(
      newTemplateResponse,
      keys,
    );
    return response;
  }

  async findByUserId(
    user_id: string,
    columns?: string[],
  ): Promise<TemplateResponseGQL> {
    return this.templateResponsesDB.findOne({ user_id: user_id }, columns);
  }

  async findByIds(ids: readonly string[]): Promise<TemplateResponseGQL> {
    return this.templateResponsesDB.findByIds(ids);
  }
}
