import { Injectable } from '@nestjs/common';
import { Template } from './compliance.entity';
import { GqlClientService } from '@common/index';

@Injectable()
export class ComplianceService {
  constructor(private readonly gqlClient: GqlClientService) {}
  private _output: string = `{
    id
    name
    sections {
      id
      name
      name_ar
      level
      questions {
        id
        title
        title_ar
        type
        rules
        options {
          id
          name
          name_ar
          created_on
          updated_on
        }
        status
        created_on
        updated_on
      }
      created_on
      updated_on
    }
    created_on
    updated_on
  }`;

  async findOneByName(name: string): Promise<Template> {
    const params = `query {
      result: findTemplateByName(name: "${name}") ${this._output}
    }`;
    return this.gqlClient.send(params);
  }
}
