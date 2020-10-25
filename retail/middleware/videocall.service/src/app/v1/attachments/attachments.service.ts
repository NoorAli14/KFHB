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
import { STATUS } from '@rubix/common/constants';

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
        status: STATUS.ACTIVE,
        deleted_on: null,
      },
      output,
    );
  }

  async find(
    currentUser: ICurrentUser,
    id: string,
    customer_id: string,
    output: string[],
  ): Promise<Attachment> {
    const response = await this.attachmentDB.findOne(
      {
        id: id,
        deleted_on: null,
        customer_id: customer_id,
        tenant_id: currentUser.tenant_id,
      },
      output,
    );

    if (!response) throw new AttachmentNotFoundException(id);

    return response;
  }

  async create(
    currentUser: ICurrentUser,
    input: NewAttachmentInput,
    output?: string[],
  ): Promise<Attachment> {
    const attachment = await this.uploadFile(
      `data:image/png;base64,${input.file_content}`,
      input.attachment_type,
      input.type,
    );

    delete attachment.type;
    delete attachment.data;

    const newAttachment: any = {
      ...attachment,
      created_by: currentUser.id,
      updated_by: currentUser.id,
      customer_id: input.customer_id,
      tenant_id: currentUser.tenant_id,
      attachment_type: input.attachment_type,
    };

    const [response] = await this.attachmentDB.create(newAttachment, output);
    return response;
  }

  async uploadFile(
    file_content: string | any,
    filename: string | any,
    type?: string | any,
  ): Promise<FileResponse> {
    const current_date = moment(new Date(), 'YYYY/MM/DD');
    //check wether ROB_AgentScreenshots folder created or not
    createDirIfNotExist(
      this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION,
    );

    //check folder created inside ROB_AgentScreenshots or not for current customer
    const ROB_path = `${
      this.configService.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION
    }${current_date.format('YYYY')}${current_date.format('MM')}`;
    createDirIfNotExist(ROB_path);

    const formated_date = `${current_date.format('YYYY')}${current_date.format(
      'MM',
    )}${current_date.format('DD')}`;

    const matches: string[] = file_content.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/,
    );
    if (!matches && matches.length !== 3)
      throw new InvalidBase64Exception(filename);

    const extension: string = mime.getExtension((type && type) || matches[1]);
    const fileName = `${formated_date}_${Date.now()}_${filename}.${extension}`;

    const response: FileResponse = {
      type: (type && type) || matches[1],
      data: new Buffer(matches[2], 'base64'),
      file_name: fileName,
      file_path: `${ROB_path}/${fileName}`,
      file_size: `${calculateImageSize(file_content).toFixed(3)} KB`,
    };

    try {
      writeFileSync(response.file_path, response.data);
      return response;
    } catch (error) {
      throw new NotCreatedException(filename);
    }
  }
}
