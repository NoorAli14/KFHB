
import { Injectable, Logger } from '@nestjs/common';
import { GqlClientService } from '@common/index';
import { AML } from './aml.entity';

@Injectable()
export class AmlService {
  private readonly logger: Logger = new Logger(AmlService.name);
  private readonly output: string = `{
    id
    request_reference
    status
    created_by
    created_on
    updated_on
    updated_by
  }`;

  constructor(private readonly gqlClient: GqlClientService) { }

  async screening(user_id: string): Promise<AML> {
    this.logger.log(`Aml:: Start aml screening for customer [${user_id}]`)
    const mutation: string = `mutation {
      result: amlScreening(user_id: "${user_id}") ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }
}
