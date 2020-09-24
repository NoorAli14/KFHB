import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';
import { TemplateResponse } from '@app/v1/template-responses/template-response.model';

@Injectable()
export class TemplateResponsesRepository extends BaseRepository {
  constructor() {
    super(TABLE.TEMPLATE_RESPONSE);
  }

  async list(keys: string | string[]): Promise<TemplateResponse[]> {
    return this._connection(this._tableName).select(keys);
  }
}
