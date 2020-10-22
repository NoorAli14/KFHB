import {
    Controller,
    UseGuards,
    ParseUUIDPipe,
    Param,
    Header,
    Get,
    Req, Query, Res, Post, Body
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Attachment } from './attachment.entity';
import { CreateAttachmentDTO } from './attachment.dto';
// import { AuthGuard, CurrentUser } from '@common/index';
import { AttachmentsService } from './attachments.service';
import { AttachmentUploadingInput } from './attachment.interface';

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
            attachment_id: input.attachment_type,
            customer_id
        };
        return this.attachmentService.upload(params);
    }

}
