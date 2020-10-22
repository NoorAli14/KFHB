import {
  Controller,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
  Logger,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Res,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthGuard, CurrentUser, DOCUMENT_TYPES } from '@common/index';
import { DocumentsService } from './documents.service';
import { Document, Evaluation } from './document.entity';
import { UploadDocumentDTO } from './document.dto';
import {
  DocumentUploadingInput,
  IDocumentProcess,
} from './document.interface';
import { User } from '../users/user.entity';

@ApiTags('Documents Uploading & Processing Module')
@Controller('documents')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class DocumentsController {
  private readonly logger: Logger = new Logger(DocumentsController.name);

  constructor(private readonly documentService: DocumentsService) { }

  @Post('nationality-id-front/upload')
  @ApiOperation({
    summary: 'Upload a national ID front side',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows document information.',
  })
  @ApiCreatedResponse({
    type: Document,
    description: 'National ID front has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async uploadNationIdFront(
    @Body() input: UploadDocumentDTO,
  ): Promise<Document> {
    this.logger.log(
      `Start ${DOCUMENT_TYPES.NATIONAL_ID_FRONT_SIDE} uploading. ...`,
    );
    const params: DocumentUploadingInput = {
      file: input.file,
      type: DOCUMENT_TYPES.NATIONAL_ID_FRONT_SIDE,
    };
    return this.documentService.upload(params);
  }

  @Post('nationality-id-front/process')
  @ApiOperation({
    summary: 'Process a national ID front side',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows document information.',
  })
  @ApiOkResponse({
    type: Document,
    description: 'National ID front has been successfully processed.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async processNationIdFront(): Promise<Document> {
    const params: IDocumentProcess = {
      type: DOCUMENT_TYPES.NATIONAL_ID_FRONT_SIDE,
    };
    return this.documentService.process(params);
  }

  @Post('nationality-id-back/upload')
  @ApiOperation({
    summary: 'Upload a national ID back side',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows document information.',
  })
  @ApiCreatedResponse({
    type: Document,
    description: 'National ID back has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async uploadNationIdBack(
    @Body() input: UploadDocumentDTO,
  ): Promise<Document> {
    const params: DocumentUploadingInput = {
      file: input.file,
      type: DOCUMENT_TYPES.NATIONAL_ID_BACK_SIDE,
    };
    return this.documentService.upload(params);
  }

  @Post('nationality-id-back/process')
  @ApiOperation({
    summary: 'Process a national ID back side',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows document information.',
  })
  @ApiOkResponse({
    type: Document,
    description: 'National ID back has been successfully processed.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async processNationIdBack(): Promise<Document> {
    const params: IDocumentProcess = {
      type: DOCUMENT_TYPES.NATIONAL_ID_BACK_SIDE,
    };
    return this.documentService.process(params);
  }

  @Post('passport/upload')
  @ApiOperation({
    summary: 'Upload a passport',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows document information.',
  })
  @ApiCreatedResponse({
    type: Document,
    description: 'Passport has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async uploadPassport(@Body() input: UploadDocumentDTO): Promise<Document> {
    const params: DocumentUploadingInput = {
      file: input.file,
      type: DOCUMENT_TYPES.PASSPORT,
    };
    return this.documentService.upload(params);
  }

  @Post('passport/process')
  @ApiOperation({
    summary: 'Process a passport',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows document information.',
  })
  @ApiOkResponse({
    type: Document,
    description: 'Passport back has been successfully processed.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async processPassport(): Promise<Document> {
    const params: IDocumentProcess = {
      type: DOCUMENT_TYPES.PASSPORT,
    };
    return this.documentService.process(params);
  }

  @Post('driving-license/upload')
  @ApiOperation({
    summary: 'Upload a Driving License',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows document information.',
  })
  @ApiCreatedResponse({
    type: Document,
    description: 'Driving License has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async uploadDrivingLicense(
    @Body() input: UploadDocumentDTO,
  ): Promise<Document> {
    const params: DocumentUploadingInput = {
      file: input.file,
      type: DOCUMENT_TYPES.DRIVING_LICENSE,
    };
    const document = await this.documentService.upload(params);
    return document
  }

  @Post('driving-license/process')
  @ApiOperation({
    summary: 'Process a driving license',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows document information.',
  })
  @ApiOkResponse({
    type: Document,
    description: 'Driving License back has been successfully processed.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async processDrivingLicense(): Promise<Document> {
    const params: IDocumentProcess = {
      type: DOCUMENT_TYPES.DRIVING_LICENSE,
    };
    return this.documentService.process(params);
  }

  @Post('verification')
  @ApiOperation({
    summary: 'Perform Documents Verification',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows documents verification information.',
  })
  @ApiCreatedResponse({
    type: Evaluation,
    description: 'Documents Verification has been successfully performed.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async evaluation(): Promise<Evaluation> {
    return this.documentService.evaluation();
  }

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
    @Res() res: Response,
    @Query('extracted-image') extracted_image?: boolean,
  ): Promise<any> {
    console.log(extracted_image);
    const params: any = {
      attachment_id: id,
      customer_id: currentUser.id,
      extracted_image: extracted_image || false
    };
    const result = await this.documentService.preview(params);
    const img: any = Buffer.from(result.image, 'base64');
    //res.end(img, 'binary');
    // request.res.setHeader(
    //   'Content-disposition',
    //   `inline; filename=${currentUser.id}.jpg`,
    // );
    // request.res.setHeader('Content-type', 'image/jpeg');
    // request.res.set('Content-Type', 'image/jpeg');

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });

    res.end(img);
    return res;
  }
}
