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
import {
  calculateImageSize,
  createDirIfNotExist,
  writeFileSync,
} from '@rubix/common/utilities';
import { FileResponse } from './interfaces/file-response.interface';

@Injectable()
export class AttachmentsService {
  constructor(
    private attachmentDB: AttachmentRepository,
    private readonly configService: ConfigurationService,
  ) {}

  async list(
    currentUser: ICurrentUser,
    customer_id: string,
    output: string[],
  ): Promise<Attachment[]> {
    return this.attachmentDB.findBy(
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
      `data:image/png;base64,${input.file_content}`,
      input.attachment_id,
    );

    delete attachment.type;
    delete attachment.data;

    const newAttachment: any = {
      ...attachment,
      created_by: currentUser.id,
      updated_by: currentUser.id,
      customer_id: input.customer_id,
      tenant_id: currentUser.tenant_id,
      attachment_id: input.attachment_id,
    };

    const [response] = await this.attachmentDB.create(newAttachment, output);
    return response;
  }

  async uploadFile(
    file_content: string | any,
    filename: string | any,
  ): Promise<FileResponse> {
    let current_date = moment(new Date(), 'YYYY/MM/DD');
    //check wether ROB_AgentScreenshots folder created or not
    createDirIfNotExist(
      this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION,
    );

    //check folder created inside ROB_AgentScreenshots or not for current customer
    const ROB_path: string = `${
      this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION
    }${current_date.format('YYYY')}${current_date.format('MM')}`;
    createDirIfNotExist(ROB_path);

    let formated_date: string = `${current_date.format(
      'YYYY',
    )}${current_date.format('MM')}${current_date.format('DD')}`;

    var matches: string[] = file_content.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/,
    );
    if (!matches && matches.length !== 3)
      throw new InvalidBase64Exception(filename);

    const extension: string = mime.getExtension(matches[1]);
    const fileName: string = `${formated_date}_${Date.now()}_${filename}.${extension}`;

    let response: FileResponse = {
      type: matches[1],
      data: new Buffer(matches[2], 'base64'),
      file_name: fileName,
      file_path: `${ROB_path}/${fileName}`,
      file_size: calculateImageSize(file_content),
    };

    try {
      writeFileSync(response.file_path, response.data);
      return response;
    } catch (error) {
      throw new NotCreatedException(filename);
    }
  }
}
