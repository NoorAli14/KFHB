import { Injectable, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql, strToBase64 } from '@common/index';
import { Template } from './compliance.entity';
import { ITemplateResponse } from './compliance.interface';
@Injectable()
export class ComplianceService {
  private readonly logger = new Logger(ComplianceService.name);

  constructor(private readonly gqlClient: GqlClientService) {}

  private _output = `{
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
    this.logger.log(`Compliance:: Find template by name [${name}]`);
    const query = `query {
      result: findTemplateByName(name: "${name}") ${this._output}
    }`;
    return this.gqlClient.send(query);
  }

  async submitResponse(input: ITemplateResponse): Promise<any> {
    Logger.log(`ComplianceService::submitResponse submit template response by customer [${input.user_id}]`);
    const params: { [key: string]: string } = {
      template_id: input.template_id,
      user_id: input.user_id,
      remarks: input.remarks,
      results: `${strToBase64(JSON.stringify(input.results))}`,
    };
    const mutation = `mutation {
      result: addTemplateResponse(input: ${toGraphql(params)}) {
        id
        remarks
        results
        created_on
        updated_on
      }
    }`;
    return this.gqlClient.send(mutation);
  }
}
