import {
  Controller,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard, DOCUMENT_TYPES } from '@common/index';
import { AttachmentsService } from './attachments.service';
import { Attachment } from './attachment.entity';
import { UploadDocumentDTO } from './document.dto';
import {
  DocumentUploadingInput,
  IDocumentProcess,
} from './attachment.interface';

@ApiTags('Documents Uploading & Processing Module')
@Controller('documents')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class DocumentsController {
  private readonly logger: Logger = new Logger(DocumentsController.name);

  constructor(private readonly documentService: AttachmentsService) {}

  @Post('nationality-id-front/upload')
  @ApiOperation({
    summary: 'Upload a national ID front side',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows document information.',
  })
  @ApiCreatedResponse({
    type: Attachment,
    description: 'National ID front has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async uploadNationIdFront(
    @Body() input: UploadDocumentDTO,
  ): Promise<Attachment> {
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
    type: Attachment,
    description: 'National ID front has been successfully processed.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async processNationIdFront(): Promise<Attachment> {
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
    type: Attachment,
    description: 'National ID back has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async uploadNationIdBack(
    @Body() input: UploadDocumentDTO,
  ): Promise<Attachment> {
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
    type: Attachment,
    description: 'National ID back has been successfully processed.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async processNationIdBack(): Promise<Attachment> {
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
    type: Attachment,
    description: 'Passport has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async uploadPassport(@Body() input: UploadDocumentDTO): Promise<Attachment> {
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
    type: Attachment,
    description: 'Passport back has been successfully processed.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async processPassport(): Promise<Attachment> {
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
    type: Attachment,
    description: 'Driving License has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async uploadDrivingLicense(
    @Body() input: UploadDocumentDTO,
  ): Promise<Attachment> {
    const params: DocumentUploadingInput = {
      file: input.file,
      type: DOCUMENT_TYPES.DRIVING_LICENSE,
    };
    return this.documentService.upload(params);
  }

  @Post('driving-license/process')
  @ApiOperation({
    summary: 'Process a driving license',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows document information.',
  })
  @ApiOkResponse({
    type: Attachment,
    description: 'Driving License back has been successfully processed.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async processDrivingLicense(): Promise<Attachment> {
    const params: IDocumentProcess = {
      type: DOCUMENT_TYPES.DRIVING_LICENSE,
    };
    return this.documentService.process(params);
  }
}
