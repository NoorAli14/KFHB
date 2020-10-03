
import { Injectable, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql } from '@common/index';
import { AMLAlertDTO } from './webhook.dto';

@Injectable()
export class WebhooksService {
  private readonly logger: Logger = new Logger(WebhooksService.name);
  private readonly output: string = `{
    id
    call_time
    gender
    status
    created_on
    updated_on
  }`;

  constructor(private readonly gqlClient: GqlClientService) { }

  async create(input: AMLAlertDTO): Promise<any> {
    const mutation: string = `mutation {
      result: amlAlert(input: ${toGraphql(input)}) {
        id
        request_reference
        status
        created_on
        created_by
        updated_on
        updated_by
      }
    }`;
    return this.gqlClient.send(mutation);
  }
}
