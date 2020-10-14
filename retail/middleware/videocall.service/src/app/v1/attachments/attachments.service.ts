import * as fs from 'fs';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { ICurrentUser } from '@common/interfaces';
import { NewAttachmentInput } from './attachment.dto';
import { AttachmentRepository } from '@core/repository';
import { AttachmentNotFoundException } from './exceptions';
import { Attachment } from './attachment.model';

@Injectable()
export class AttachmentsService {
  constructor(private attachmentDB: AttachmentRepository) {}
  // async uploadFile(file: string): Promise<any> {}

  async uploadFile(
    file_source: string | any,
    filename: string | any,
    type?: string | any,
  ) {
    // console.log(atob(file_source), '[][][][][][][][]');
    let base64Image = file_source.split(';base64,').pop();
    fs.writeFile(
      `./uploads/ROB_AgentScreenshots/${filename}.png`,
      base64Image,
      { encoding: type || 'base64' },
      err => {
        console.log('File created', [err]);
      },
    );
  }

  async create(
    currentUser: ICurrentUser,
    input: NewAttachmentInput,
    output?: string[],
  ): Promise<Attachment> {
    const attachment = await this.uploadFile(
      input.file_source,
      input.screenshot_id,
    );

    //TODO: need this to be dynamic
    const newAttachment: any = {
      file_name: `${input.screenshot_id}_${new Date()}`,
      file_size: 20.1,
      file_path: 'some path here',
      tag_name: 'test tag',
      user_id: input.user_id,
      screenshot_id: input.screenshot_id,
    };
    const [response] = await this.attachmentDB.create(
      {
        ...newAttachment,
        status: 'Active',
        created_by: currentUser.id,
        updated_by: currentUser.id,
        tenant_id: currentUser.tenant_id,
      },
      output,
    );
    console.log(response, '[][][][][][]');
    return response;
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
        screenshot_id: screenshot_id,
        tenant_id: currentUser.tenant_id,
      },
      output,
    );

    if (!response)
      throw new AttachmentNotFoundException(user_id, screenshot_id);

    return response;
  }
}
