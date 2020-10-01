import {
  Controller,
  UseGuards,
  ParseUUIDPipe,
  Param,
  Header,
  Get,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard, CurrentUser } from '@common/index';
import { AttachmentsService } from './attachments.service';
import { Customer as User } from '../customers/customer.entity';

@ApiTags('Attachment')
@Controller('attachments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AttachmentsController {
  constructor(private readonly documentService: AttachmentsService) { }

  @Get(':id/preview')
  @ApiOperation({
    summary: 'Preview a identity image',
    description:
      'A successful request returns the HTTP 20O OK status code and a response return a multipart buffer stream.',
  })
  @ApiOkResponse({})
  @Header('Content-Type', 'image/jpeg')
  async preview(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: User,
    @Req() request: Request,
  ): Promise<any> {
    const params: any = {
      attachment_id: id,
      customer_id: currentUser.id,
    };
    const result = await this.documentService.preview(params);
    const img: any = Buffer.from(result.image, 'base64');
    // request.res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    request.res.end(img, 'binary');
    // request.res.setHeader(
    //   'Content-disposition',
    //   `inline; filename=${currentUser.id}.jpg`,
    // );
    // request.res.setHeader('Content-type', 'image/jpeg');
    // request.res.set('Content-Type', 'image/jpeg');

    // request.res.contentType('image/jpeg');
    // request.res.write(buf);
    // request.res.end();
    // request.res;
  }
}
