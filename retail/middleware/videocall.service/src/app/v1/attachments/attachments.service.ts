import { Injectable } from '@nestjs/common';
import { ICurrentUser } from '@common/interfaces';
import { NewAttachmentInput } from './attachment.dto';
import { AttachmentRepository } from '@core/repository';
import { AttachmentNotFoundException } from './exceptions';
import { Attachment } from './attachment.model';

@Injectable()
export class AttachmentsService {
  constructor(private attachmentDB: AttachmentRepository) {}
  async uploadFile(file: string): Promise<any> {}

  async create(
    currentUser: ICurrentUser,
    input: NewAttachmentInput,
    output?: string[],
  ): Promise<any> {
    return `This will return a attachment after create entry in database`;
  }

  async find(
    currentUser: ICurrentUser,
    user_id: string,
    screenshot_id: string,
    output: string[],
  ): Promise<Attachment> {
    const response = await this.attachmentDB.findOne(
      {
        deleted_on: null,
        user_id: user_id,
        // screenshot_id: screenshot_id,
        tenant_id: currentUser.tenant_id,
      },
      output,
    );

    if (!response)
      throw new AttachmentNotFoundException(user_id, screenshot_id);

    return response;
  }
}
