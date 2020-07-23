import { Injectable } from '@nestjs/common';
import { TemplateResponsesRepository } from '@core/repository/template-responses.repository';
import { NewTemplateResponseInput } from './template-response.dto';

@Injectable()
export class TemplateResponsesService {
  constructor(
    private readonly templateResponsesDB: TemplateResponsesRepository,
  ) {}

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
}
