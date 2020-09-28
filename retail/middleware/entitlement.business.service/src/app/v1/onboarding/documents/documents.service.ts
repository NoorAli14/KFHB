import { Injectable, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql } from '@common/index';

@Injectable()
export class DocumentsService {
  private readonly logger: Logger = new Logger(DocumentsService.name);

  constructor(private readonly gqlClient: GqlClientService) { }

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
