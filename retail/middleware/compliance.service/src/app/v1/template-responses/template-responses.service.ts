import { Injectable } from '@nestjs/common';
import { TemplateResponsesRepository } from '@core/repository/template-responses.repository';
import { NewTemplateResponseInput } from './template-response.dto';
import { TemplateResponse } from './template-response.model';
import { ICurrentUser } from '@common/interfaces';

@Injectable()
export class TemplateResponsesService {
  constructor(
    private readonly templateResponsesDB: TemplateResponsesRepository,
  ) { }

  async list(keys: string[]): Promise<TemplateResponse[]> {
    return this.templateResponsesDB.list(keys);
  }

  async create(
    currentUser: ICurrentUser,
    newTemplateResponse: NewTemplateResponseInput,
    output?: string[],
  ): Promise<TemplateResponse> {
    const [response] = await this.templateResponsesDB.create(
      {
        ...newTemplateResponse,
        created_by: currentUser.id,
        updated_by: currentUser.id,
        tenant_id: currentUser.tenant_id,
      },
      output,
    );
    return response;
  }

  async findByUserId(
    currentUser: ICurrentUser,
    user_id: string,
    output?: string[],
  ): Promise<TemplateResponse[]> {
    return this.templateResponsesDB.findBy(
      { user_id: user_id, deleted_on: null, tenant_id: currentUser.tenant_id },
      output,
    );
  }

  async findByIds(ids: readonly string[]): Promise<TemplateResponse> {
    return this.templateResponsesDB.findByIds(ids);
  }
}
