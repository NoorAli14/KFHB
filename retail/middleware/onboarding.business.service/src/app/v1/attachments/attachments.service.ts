import { Injectable } from '@nestjs/common';
import { Attachment } from './attachment.entity';
import { GqlClientService, toGraphql, IHEADER } from '@common/index';
import {
  FaceUploadingInput,
  DocumentUploadingInput,
  IDocumentProcess,
} from './attachment.interface';

@Injectable()
export class AttachmentsService {
  private readonly output: string = `{
        id
        session_id
        processed_data
        status
        created_on
        created_by
        updated_on
        updated_by
    }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  /**
   *
   * @param header GQL request headers
   * @param input Upload face Input
   * @return The attachment object
   */
  async uploadLiveness(
    header: IHEADER,
    input: FaceUploadingInput,
  ): Promise<Attachment> {
    // Construct GraphQL request
    const params: string = `mutation {
      result: uploadLiveness(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(params);
  }

  /**
   *
   * @param header GQL request headers
   * @param input Upload document Input
   * @return The attachment object
   */
  async upload(
    header: IHEADER,
    input: DocumentUploadingInput,
  ): Promise<Attachment> {
    // Construct GraphQL request
    const params: string = `mutation {
        result: addDocument(input: ${toGraphql(input)}) ${this.output}
      }`;
    return this.gqlClient.setHeaders(header).send(params);
  }

  /**
   *
   * @param header GQL request headers
   * @param input Process document Input
   * @return The attachment object
   */
  async process(header: IHEADER, input: IDocumentProcess): Promise<Attachment> {
    // Construct GraphQL request
    const params: string = `mutation {
        result: processDocument(input: ${toGraphql(input)}) ${this.output}
      }`;
    const document: any = await this.gqlClient.setHeaders(header).send(params);
    if (document?.processed_data)
      document.processed_data = JSON.parse(document.processed_data);
    return document;
  }
}
