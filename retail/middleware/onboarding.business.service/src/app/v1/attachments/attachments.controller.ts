import {
  Controller,
  UseGuards,
  ParseUUIDPipe,
  Param,
  Get,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Attachment } from './attachment.entity';
import { CreateAttachmentDTO } from './attachment.dto';
// import { AuthGuard, CurrentUser } from '@common/index';
import { AttachmentsService } from './attachments.service';
import { AttachmentUploadingInput } from './attachment.interface';
import { readFileStream } from '@root/src/common/utilities';

@ApiTags('Attachment')
@ApiBearerAuth()
// @UseGuards(AuthGuard)
@Controller()
export class AttachmentsController {
  constructor(private readonly attachmentService: AttachmentsService) { }

  @Post('customers/:customer_id/attachments')
  @ApiOperation({
    summary: 'Upload a customer attachment',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows attachment information.',
  })
  @ApiCreatedResponse({
    type: Attachment,
    description: 'Attachment has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async create(
    @Body() input: CreateAttachmentDTO,
    @Param('customer_id', ParseUUIDPipe) customer_id: string,
  ): Promise<Attachment> {
    const params: AttachmentUploadingInput = {
      file_content: input.file_content,
      attachment_type: input.attachment_type,
      customer_id,
    };
    return this.attachmentService.upload(params);
  }

  @Get('customers/:customer_id/attachments')
  @ApiOperation({
    summary: 'List of all the attachment by customer ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows a attachments information.',
  })
  @ApiOkResponse({
    type: [Attachment],
    description: 'List of all the attachment by customer ID',
  })
  async list(
    @Param('customer_id', ParseUUIDPipe) customer_id: string,
  ): Promise<Attachment[]> {
    return this.attachmentService.listByCustomerID(customer_id);
  }

  @Get('customers/:customer_id/attachments/:id')
  @ApiOperation({
    summary: 'Fetch the attachment for customer',
    description:
      'A successful request returns the HTTP 200 OK status code and a steam to preview attachment.',
  })
  @ApiOkResponse({
    description: 'Fetch the attachment for the customer',
  })
  async find(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('customer_id', ParseUUIDPipe) customer_id: string,
    @Res() res: any,
  ): Promise<any> {
    const response = await this.attachmentService.find(id, customer_id);
    return readFileStream(response.file_path, res);
  }
}
