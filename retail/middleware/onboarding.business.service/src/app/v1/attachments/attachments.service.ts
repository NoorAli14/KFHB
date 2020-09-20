import { Injectable } from '@nestjs/common';
import { Attachment } from './attachment.entity';
import { GqlClientService, toGraphql } from '@common/index';
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
  async uploadLiveness(input: FaceUploadingInput): Promise<Attachment> {
    // Construct GraphQL request
    const mutation = `mutation {
      result: uploadLiveness(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  /**
   *
   * @param header GQL request headers
   * @param input Upload document Input
   * @return The attachment object
   */
  async upload(input: DocumentUploadingInput): Promise<Attachment> {
    // Construct GraphQL request
    const mutation = `mutation {
        result: addDocument(input: ${toGraphql(input)}) ${this.output}
      }`;
    return this.gqlClient.send(mutation);
  }

  /**
   *
   * @param header GQL request headers
   * @param input Process document Input
   * @return The attachment object
   */
  async process(input: IDocumentProcess): Promise<Attachment> {
    // Construct GraphQL request
    const mutation = `mutation {
        result: processDocument(input: ${toGraphql(input)}) ${this.output}
      }`;
    const document: any = await this.gqlClient.send(mutation);
    if (document?.processed_data)
      document.processed_data = JSON.parse(document.processed_data);
    return document;
  }

  async preview(input: Record<string, string>): Promise<any> {
    // Construct GraphQL request
    const query = `query {
      result: previewAttachment(
          input: ${toGraphql(input)}) {
        image
      }
    }`;
    return this.gqlClient.send(query);
  }
}
