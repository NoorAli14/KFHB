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
import { Response } from 'express';

import {
  AuthGuard,
  CurrentUser,
  CUSTOMER_LAST_STEPS,
  DOCUMENT_STATUSES,
  DOCUMENT_TYPES,
  EVALUATION_STATUSES,
  PermissionsGuard,
  Permissions,
} from '@common/index';
import { DocumentsService } from './documents.service';
import { Document, Evaluation } from './document.entity';
import { UploadDocumentDTO } from './document.dto';
import { DocumentUploadingInput, IDocumentProcess } from './document.interface';
import { CustomersService } from '../customers/customers.service';
import { User } from '../users/user.entity';

@ApiTags('Documents Uploading & Processing Module')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
@Controller()
export class DocumentsController {
  private readonly logger: Logger = new Logger(DocumentsController.name);

  constructor(private readonly documentService: DocumentsService, private readonly customerService: CustomersService) {}

  @Post('documents/nationality-id-front/upload')
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
  async uploadNationIdFront(@CurrentUser() currentUser: User, @Body() input: UploadDocumentDTO): Promise<Document> {
    this.logger.log(`Start ${DOCUMENT_TYPES.NATIONAL_ID_FRONT_SIDE} uploading. ...`);
    const params: DocumentUploadingInput = {
      file: input.file,
      type: DOCUMENT_TYPES.NATIONAL_ID_FRONT_SIDE,
    };
    const result = await this.documentService.upload(params);
    if (result?.status === DOCUMENT_STATUSES.PROCESSING) {
      await this.customerService.updateLastStep(
        currentUser.id,
        CUSTOMER_LAST_STEPS.RBX_ONB_STEP_NATIONAL_ID_FRONT_UPLOADED,
      );
    }
    return result;
  }

  @Post('documents/nationality-id-front/process')
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
  async processNationIdFront(@CurrentUser() currentUser: User): Promise<Document> {
    const params: IDocumentProcess = {
      type: DOCUMENT_TYPES.NATIONAL_ID_FRONT_SIDE,
    };
    const result = await this.documentService.process(params);
    if (result?.status === DOCUMENT_STATUSES.PROCESSED) {
      await this.customerService.updateLastStep(
        currentUser.id,
        CUSTOMER_LAST_STEPS.RBX_ONB_STEP_NATIONAL_ID_FRONT_PROCESSED,
      );
    }
    return result;
  }

  @Post('documents/nationality-id-back/upload')
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
  async uploadNationIdBack(@CurrentUser() currentUser: User, @Body() input: UploadDocumentDTO): Promise<Document> {
    const params: DocumentUploadingInput = {
      file: input.file,
      type: DOCUMENT_TYPES.NATIONAL_ID_BACK_SIDE,
    };
    const result = await this.documentService.upload(params);
    if (result?.status === DOCUMENT_STATUSES.PROCESSING) {
      await this.customerService.updateLastStep(
        currentUser.id,
        CUSTOMER_LAST_STEPS.RBX_ONB_STEP_NATIONAL_ID_BACK_UPLOADED,
      );
    }
    return result;
  }

  @Post('documents/nationality-id-back/process')
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
  async processNationIdBack(@CurrentUser() currentUser: User): Promise<Document> {
    const params: IDocumentProcess = {
      type: DOCUMENT_TYPES.NATIONAL_ID_BACK_SIDE,
    };
    const result = await this.documentService.process(params);
    if (result?.status === DOCUMENT_STATUSES.PROCESSED) {
      await this.customerService.updateLastStep(
        currentUser.id,
        CUSTOMER_LAST_STEPS.RBX_ONB_STEP_NATIONAL_ID_BACK_PROCESSED,
      );
    }
    return result;
  }

  @Post('documents/passport/upload')
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
  async uploadPassport(@CurrentUser() currentUser: User, @Body() input: UploadDocumentDTO): Promise<Document> {
    const params: DocumentUploadingInput = {
      file: input.file,
      type: DOCUMENT_TYPES.PASSPORT,
    };
    const result = await this.documentService.upload(params);
    if (result?.status === DOCUMENT_STATUSES.PROCESSING) {
      await this.customerService.updateLastStep(currentUser.id, CUSTOMER_LAST_STEPS.RBX_ONB_STEP_PASSPORT_UPLOADED);
    }
    return result;
  }

  @Post('documents/passport/process')
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
  async processPassport(@CurrentUser() currentUser: User): Promise<Document> {
    const params: IDocumentProcess = {
      type: DOCUMENT_TYPES.PASSPORT,
    };
    const result = await this.documentService.process(params);
    if (result?.status === DOCUMENT_STATUSES.PROCESSED) {
      await this.customerService.updateLastStep(currentUser.id, CUSTOMER_LAST_STEPS.RBX_ONB_STEP_PASSPORT_PROCESSED);
    }
    return result;
  }

  @Post('documents/driving-license/upload')
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
  async uploadDrivingLicense(@CurrentUser() currentUser: User, @Body() input: UploadDocumentDTO): Promise<Document> {
    const params: DocumentUploadingInput = {
      file: input.file,
      type: DOCUMENT_TYPES.DRIVING_LICENSE,
    };
    const result = await this.documentService.upload(params);
    if (result?.status === DOCUMENT_STATUSES.PROCESSING) {
      await this.customerService.updateLastStep(
        currentUser.id,
        CUSTOMER_LAST_STEPS.RBX_ONB_STEP_DRIVING_LICENCE_UPLOADED,
      );
    }
    return result;
  }

  @Post('documents/driving-license/process')
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
  async processDrivingLicense(@CurrentUser() currentUser: User): Promise<Document> {
    const params: IDocumentProcess = {
      type: DOCUMENT_TYPES.DRIVING_LICENSE,
    };
    const result = await this.documentService.process(params);
    if (result?.status === DOCUMENT_STATUSES.PROCESSED) {
      await this.customerService.updateLastStep(
        currentUser.id,
        CUSTOMER_LAST_STEPS.RBX_ONB_STEP_DRIVING_LICENCE_PROCESSED,
      );
    }
    return result;
  }

  @Post('documents/verification')
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
  async evaluation(@CurrentUser() currentUser: User): Promise<Evaluation> {
    const result = await this.documentService.evaluation();
    if (result?.status === EVALUATION_STATUSES.MATCH) {
      await this.customerService.updateLastStep(currentUser.id, CUSTOMER_LAST_STEPS.RBX_ONB_STEP_DOCUMENTS_MATCHED);
    } else if (result?.status === EVALUATION_STATUSES.MISMATCH) {
      await this.customerService.updateLastStep(currentUser.id, CUSTOMER_LAST_STEPS.RBX_ONB_STEP_DOCUMENTS_MISMATCHED);
    }
    return result;
  }

  @Get('documents/:id/preview')
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
    const params: any = {
      attachment_id: id,
      customer_id: currentUser.id,
      extracted_image: extracted_image || false,
    };
    const img = await this.documentService.preview(params);
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length,
    });
    res.end(img);
  }

  @Get('customers/:customer_id/documents/:id/preview')
  @ApiOperation({
    summary: 'Preview a identity image',
    description:
      'A successful request returns the HTTP 200 OK status code and a response return a multipart buffer stream.',
  })
  @ApiOkResponse({})
  @Header('Content-Type', 'image/jpeg')
  @Permissions('attend:video')
  async previewDoc(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('customer_id', ParseUUIDPipe) customer_id: string,
    @Res() res: Response,
    @Query('extracted-image') extracted_image?: boolean,
  ): Promise<any> {
    const params: any = {
      attachment_id: id,
      customer_id: customer_id,
      extracted_image: extracted_image || false,
    };
    const img = await this.documentService.preview(params);
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length,
    });

    res.end(img);
  }
}
