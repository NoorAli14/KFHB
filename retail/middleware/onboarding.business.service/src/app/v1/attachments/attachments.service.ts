
import { Injectable, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql } from '@common/index';
import { Attachment } from './attachment.entity'
import { AttachmentUploadingInput } from './attachment.interface';
@Injectable()
export class AttachmentsService {

    private readonly logger = new Logger(AttachmentsService.name)
    private readonly output: string = `{
          id
          file_name
          file_size
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
     * @param input Upload document Input
     * @return The attachment object
     */
    async upload(input: AttachmentUploadingInput): Promise<Attachment> {
        this.logger.log(`Attachment:: Start uploading [${input.attachment_id}]`)
        // Construct GraphQL request
        const mutation: string = `mutation {
        result: addAttachment(input: ${toGraphql(input)}) ${this.output}
      }`;
        return this.gqlClient.send(mutation);
    }

    /**
 *
 * @param customer_id  The customer unique identifies
 * @return The attachment array of objects
 */
    async listByCustomerID(customer_id: string): Promise<Attachment[]> {
        this.logger.log(`Attachment:: list of attachments by customer ID [${customer_id}]`)
        // Construct GraphQL request
        const query: string = `query {
        result: attachmentList(customer_id: "${customer_id}") ${this.output}
      }`;
        return this.gqlClient.send(query);
    }


}