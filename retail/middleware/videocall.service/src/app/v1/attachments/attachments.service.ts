import { Injectable } from '@nestjs/common';
import { ICurrentUser } from '@common/interfaces';
import { NewAttachmentInput } from './attachment.dto';

@Injectable()
export class AttachmentsService {
  async create(
    currentUser: ICurrentUser,
    input: NewAttachmentInput,
    output?: string[],
  ): Promise<any> {
    return `This will return a attachment after create entry in database`;
  }

  async findByTagName(
    currentUser: ICurrentUser,
    tag_name: string,
    output: string[],
  ) {
    return `This will return attachment base on tag name  + [${tag_name}]`;
  }
}
