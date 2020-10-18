import * as fs from 'fs';
import * as mime from 'mime';
import * as moment from 'moment';
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

  async list(currentUser: ICurrentUser, customer_id: string, output: string[]) {
    return await this.attachmentDB.findBy(
      {
        customer_id: customer_id,
        tenant_id: currentUser.tenant_id,
        deleted_on: null,
      },
      output,
    );
  }

  async find(
    currentUser: ICurrentUser,
    customer_id: string,
    attachment_id: string,
    output: string[],
  ): Promise<Attachment> {
    const response = await this.attachmentDB.findOne(
      {
        deleted_on: null,
        customer_id: customer_id,
        attachment_id: attachment_id,
        tenant_id: currentUser.tenant_id,
      },
      output,
    );

    if (!response)
      throw new AttachmentNotFoundException(customer_id, attachment_id);

    return response;
  }

  async create(
    currentUser: ICurrentUser,
    input: NewAttachmentInput,
    output?: string[],
  ): Promise<Attachment> {
    const attachment = await this.uploadFile(
      input.file_content,
      input.attachment_id,
      input.customer_id,
    );

    delete attachment.type;
    delete attachment.data;

    const newAttachment: any = {
      ...attachment,
      status: 'Active',
      customer_id: input.customer_id,
      attachment_id: input.attachment_id,
      created_by: currentUser.id,
      updated_by: currentUser.id,
      tenant_id: currentUser.tenant_id,
    };

    const [response] = await this.attachmentDB.create(newAttachment, output);
    return response;
  }

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

  async uploadFile(
    file_content: string | any,
    filename: string | any,
    customer_id: string | any,
  ) {
    //check wether ROB_AgentScreenshots folder created or not
    if (
      !fs.existsSync(this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION)
    ) {
      fs.mkdirSync(this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION);
    }

    let current_date = moment(new Date(), 'YYYY/MM/DD');
    //check folder created inside ROB_AgentScreenshots or not for current customer
    if (
      !fs.existsSync(
        this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION +
          `${current_date.format('YYYY')}${current_date.format('MM')}`,
      )
    ) {
      fs.mkdirSync(
        this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION +
          `${current_date.format('YYYY')}${current_date.format('MM')}`,
      );
    }
    let formated_date = `${current_date.format('YYYY')}${current_date.format(
      'MM',
    )}${current_date.format('DD')}`;

    let response: any = {};
    var matches = file_content.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches.length !== 3) return new InvalidBase64Exception(filename);

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    const extension = mime.getExtension(`${response.type}`);
    const fileName = `${formated_date}_${Date.now()}_${filename}.${extension}`;
    const path = `${this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION}${customer_id}/${fileName}`;

    response.file_name = fileName;
    response.file_path = path;
    response.file_size = this.calculateImageSize(file_content);

    try {
      fs.writeFileSync(path, response.data, 'utf8');
      return response;
    } catch (error) {
      return new NotCreatedException(filename);
    }
  }
}
