import { Injectable } from '@nestjs/common';
import { TemplateRepository } from '@core/repository';
import { ICurrentUser } from '@common/interfaces';
import { STATUSES } from '@common/constants';
import { Template } from './template.model';

@Injectable()
export class TemplatesService {
  constructor(private templateDB: TemplateRepository) {}

  async list(currentUser: ICurrentUser, output: string[]): Promise<any> {
    return this.templateDB.list(output);
  }

  async findById(
    currentUser: ICurrentUser,
    id: string,
    output?: string[],
  ): Promise<Template> {
    return this.templateDB.findOne(
      {
        id: id,
        tenant_id: currentUser.tenant_id,
        deleted_on: null,
        status: STATUSES.ACTIVE,
      },
      output,
    );
  }

  async findByIds(ids: readonly string[], keys?: string[]): Promise<any> {
    return this.templateDB.findByIds(ids, keys);
  }

  async findByIdsSorted(ids: readonly string[], keys?: string[]): Promise<any> {
    return this.templateDB.findByIds(ids, keys, true);
  }

  async findByName(
    currentUser: ICurrentUser,
    name: string,
    output?: string[],
  ): Promise<Template> {
    return this.templateDB.findOne(
      {
        name: name,
        tenant_id: currentUser.tenant_id,
        deleted_on: null,
        status: STATUSES.ACTIVE,
      },
      output,
    );
  }
}
