import * as fs from 'fs';
import * as mime from 'mime';
import { Injectable } from '@nestjs/common';
import { ICurrentUser } from '@common/interfaces';
import { AttachmentRepository } from '@core/repository';
import { ConfigurationService } from '@common/configuration/configuration.service';

import { Attachment } from './attachment.model';
import { NewAttachmentInput } from './attachment.dto';
import {
  AttachmentNotFoundException,
  NotCreatedException,
  InvalidBase64Exception,
} from './exceptions';

@Injectable()
export class AttachmentsService {
  constructor(
    private attachmentDB: AttachmentRepository,
    private readonly configService: ConfigurationService,
  ) {}
  // async uploadFile(file: string): Promise<any> {}

  async uploadFile(file_source: string | any, filename: string | any) {
    let response: any = {};
    var matches = file_source.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) return new InvalidBase64Exception(filename);

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    const decodedImg = response;
    const imageBuffer = decodedImg.data;
    const type = decodedImg.type;

    const extension = mime.getExtension(`${type}`);
    const fileName = `${filename}_${Date.now()}.${extension}`;
    const path = `${this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION}/${fileName}`;

    response.file_name = filename;
    response.file_path = path;
    try {
      fs.writeFileSync(path, imageBuffer, 'utf8');
      return response;
    } catch (error) {
      return new NotCreatedException(filename);
    }
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

    delete attachment.type;
    delete attachment.data;

    //TODO: need this to be dynamic
    const newAttachment: any = {
      ...attachment,
      file_size: 20.1,
      customer_id: input.customer_id,
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
