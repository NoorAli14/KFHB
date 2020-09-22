import { Injectable, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql } from '@common/index';
import { IHEADER } from '@common/interfaces';

@Injectable()
export class DocumentsService {
    private readonly logger: Logger = new Logger(DocumentsService.name);

    constructor(private readonly gqlClient: GqlClientService) { }

    async preview(header: IHEADER, input: Record<string, string>): Promise<any> {
        // Construct GraphQL request
        const query: string = `query {
          result: previewAttachment(
              input: ${toGraphql(input)}) {
            image
          }
        }`;
        return this.gqlClient.setHeaders(header).send(query);
    }
}
