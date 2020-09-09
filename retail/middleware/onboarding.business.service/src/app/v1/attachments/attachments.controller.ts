import {
  Controller,
  UseGuards,
  Logger,
  ParseUUIDPipe,
  Param,
  Get,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard, Header, IHEADER, CurrentUser } from '@common/index';
import { AttachmentsService } from './attachments.service';

@ApiTags('Attachment')
@Controller('attachments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AttachmentsController {
  private readonly logger: Logger = new Logger(AttachmentsController.name);

  constructor(private readonly documentService: AttachmentsService) {}

  @Get(':id/preview')
  @ApiOperation({
    summary: 'Preview a identity image',
    description:
      'A successful request returns the HTTP 20O OK status code and a response return a multipart buffer stream.',
  })
  @ApiOkResponse({})
  async preview(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: any,
    @Header() header: IHEADER,
    @Req() request: any,
  ): Promise<any> {
    const params: any = {
      attachment_id: id,
      customer_id: currentUser.id,
    };
    const result = await this.documentService.preview(header, params);
    const img: any = Buffer.from(result.image, 'base64');
    request.res.writeHead(200, { 'Content-Type': 'image/jpeg' });
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
