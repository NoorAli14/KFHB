import { Injectable, Logger } from '@nestjs/common';
import { Session, Evaluation } from './session.entity';
import { GqlClientService, IHEADER, toGraphql } from '@common/index';
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

  async create(header: IHEADER): Promise<Session> {
    const params: string = `mutation {
      result: addSession ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(params);
  }

  /**
   *
   * @param header GQL request headers
   * @param input Fido Request Input
   * @return The session object
   */
  async update(header: IHEADER, input: FaceUploadingInput): Promise<Session> {
    // Construct GraphQL request
    // const params: string = `mutation {
    //   result: updateSession(input:  {
    //     file: '${JSON.stringify(JSON.parse(input.file)).replace(/"/g, '\\"')}'
    //   })} {id customer_id}
    // }`;

    const params = `mutation {
      session: updateSession(input: {
          file: "${input.file}"
        }) {
        id
        customer_id
        tenant_id
        reference_id
        target_user_id
        fido_reg_req_id
        fido_reg_req
        check_id
        status
        created_on
        created_by
        updated_on
        updated_by   
      }
    }`;
    this.logger.log(params);
    return this.gqlClient.setHeaders(header).send(params);
  }

  /**
   *
   * @param header GQL request headers
   * @return The Evaluation object
   */
  async evaluation(header: IHEADER): Promise<Evaluation> {
    const params: string = `mutation {
      result: evaluation {
        success
        status
        message
      }
    }`;
    return this.gqlClient.setHeaders(header).send(params);
  }
}
