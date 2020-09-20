import { Injectable, Logger } from '@nestjs/common';
import { Session, Evaluation } from './session.entity';
import { GqlClientService, strToBase64 } from '@common/index';
import { FaceUploadingInput } from '../attachments/attachment.interface';

@Injectable()
export class SessionsService {
  private readonly logger: Logger = new Logger(SessionsService.name);

  private readonly output: string = `{
    id
    customer_id
    reference_id
    fido_reg_req_id
    fido_reg_req
    status
    created_on
    created_by
    updated_on
    updated_by   
  }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  async create(): Promise<Session> {
    const mutation = `mutation {
      result: addSession ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  /**
   *
   * @param header GQL request headers
   * @param input Fido Request Input
   * @return The session object
   */
  async update(input: FaceUploadingInput): Promise<Session> {
    // Construct GraphQL request
    const mutation = `mutation {
      result: updateSession(input: {
          file: "${strToBase64(input.file)}"
        }) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  /**
   *
   * @param header GQL request headers
   * @return The Evaluation object
   */
  async evaluation(): Promise<Evaluation> {
    const mutation = `mutation {
      result: evaluation {
        success
        status
        message
      }
    }`;
    return this.gqlClient.send(mutation);
  }
}
