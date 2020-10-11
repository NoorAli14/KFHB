import {
    Controller,
    UseGuards,
    ParseUUIDPipe,
    Param,
    Header,
    Get,
    Req, Query
} from '@nestjs/common';
import {
    ApiTags,
    ApiOkResponse,
    ApiOperation,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard, PermissionsGuard, Permissions } from '@common/index';
import { DocumentsService } from './documents.service';

@ApiTags('Documents Module')
@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
export class DocumentsController {

    constructor(private readonly documentService: DocumentsService) { }

    @Get('customers/:customer_id/documents/:id/preview')
    @ApiOperation({
        summary: 'Preview a documents',
        description:
            'A successful request returns the HTTP 200 OK status code and a response return a multipart buffer stream.',
    })
    @ApiOkResponse({})
    @Header('Content-Type', 'image/jpeg')
    @Permissions('attend:video')
    async preview(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('customer_id', ParseUUIDPipe) customer_id: string,
        @Req() request: Request,
        @Query('extracted-image') extracted_image?: boolean,
    ): Promise<any> {
        console.log(extracted_image);
        const params: any = {
            attachment_id: id,
            customer_id: customer_id,
            extracted_image: extracted_image || false
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
