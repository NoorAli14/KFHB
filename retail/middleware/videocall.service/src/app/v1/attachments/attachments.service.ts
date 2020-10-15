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

  calculateImageSize(base64String: string) {
    let padding: number;
    let inBytes: number;
    let base64StringLength: number;

    if (base64String.endsWith('==')) padding = 2;
    else if (base64String.endsWith('=')) padding = 1;
    else padding = 0;

    base64StringLength = base64String.length;
    inBytes = base64StringLength * (4 / 3) - padding;
    return inBytes / 1024;
  }

  async uploadFile(file_source: string | any, filename: string | any) {
    let response: any = {};
    var matches = file_source.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) return new InvalidBase64Exception(filename);

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    const extension = mime.getExtension(`${response.type}`);
    const fileName = `${filename}_${Date.now()}.${extension}`;
    const path = `${this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION}/${fileName}`;

    response.file_name = filename;
    response.file_path = path;
    response.file_size = this.calculateImageSize(file_source);

    try {
      fs.writeFileSync(path, response.data, 'utf8');
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

    const newAttachment: any = {
      ...attachment,
      status: 'Active',
      customer_id: input.customer_id,
      screenshot_id: input.screenshot_id,
      created_by: currentUser.id,
      updated_by: currentUser.id,
      tenant_id: currentUser.tenant_id,
    };

    const [response] = await this.attachmentDB.create(newAttachment, output);
    return response;
  }

  async find(
    currentUser: ICurrentUser,
    customer_id: string,
    screenshot_id: string,
    output: string[],
  ): Promise<Attachment> {
    const response = await this.attachmentDB.findOne(
      {
        deleted_on: null,
        customer_id: customer_id,
        screenshot_id: screenshot_id,
        tenant_id: currentUser.tenant_id,
      },
      output,
    );

    if (!response)
      throw new AttachmentNotFoundException(customer_id, screenshot_id);

    return response;
  }
}
