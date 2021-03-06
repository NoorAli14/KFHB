import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Document, Evaluation } from './document.entity';
import { GqlClientService, toGraphql } from '@common/index';
import { FaceUploadingInput, DocumentUploadingInput, IDocumentProcess } from './document.interface';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);
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

  constructor(private readonly gqlClient: GqlClientService) { }

  /**
   *
   * @param header GQL request headers
   * @param input Upload face Input
   * @return The attachment object
   */
  async uploadLiveness(input: FaceUploadingInput): Promise<Document> {
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
  async upload(input: DocumentUploadingInput): Promise<Document> {
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
  async process(input: IDocumentProcess): Promise<Document> {
    const _output = `{
      ... on Document {
        id
        session_id
        processed_data
        status
        created_on
        created_by
        updated_on
        updated_by
      }
      ... on CUSTOM_ERROR {
        errors {
          name
          message
          developerMessage
          field
          value
        }
      }
    }`;
    // Construct GraphQL request
    const mutation = `mutation {
      result: processDocument(input: ${toGraphql(input)}) ${_output}
    }`;
    this.logger.log(mutation);
    const document: any = await this.gqlClient.send(mutation);
    if (document?.errors) throw new BadRequestException({ errors: document.errors, name: 'MRZ_VALIDATION_ERROR' });
    if (document?.processed_data) document.processed_data = JSON.parse(document.processed_data);
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
    const result = await this.gqlClient.send(query);
    return Buffer.from(result.image, 'base64');
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
    const result: any = await this.gqlClient.send(mutation);
    if (result?.errors) throw new BadRequestException({ errors: result.errors, name: 'DOCUMENT_EVALUATION_ERROR' });
    return result;
  }
}
