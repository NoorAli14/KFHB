import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard, CurrentUser, CUSTOMER_LAST_STEPS, DOCUMENT_STATUSES, SELFIE_SUB_TYPES } from '@common/index';
import { DocumentsService as FaceService } from './documents.service';
import { Document } from './document.entity';
import { UploadDocumentDTO, UploadSelfieDTO } from './document.dto';
import { FaceUploadingInput } from './document.interface';
import { SessionsService } from '../sessions/sessions.service';
import { Session } from '../sessions/session.entity';
import { CustomersService } from '../customers/customers.service';
import { User } from '../users/user.entity';

@ApiTags('Face Images Uploading Module')
@Controller('faces')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class FacesController {
  constructor(
    private readonly attachmentService: FaceService,
    private readonly sessionService: SessionsService,
    private readonly customerService: CustomersService,
  ) { }

  @Post('selfie/upload')
  @ApiOperation({
    summary: 'Upload a selfie',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows face information.',
  })
  @ApiCreatedResponse({
    type: Document,
    description: 'Selfie has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async uploadSelfie(
    @CurrentUser() currentUser: User,
    @Body() input: UploadSelfieDTO
  ): Promise<Session> {
    const params: FaceUploadingInput = {
      file: input.file,
    };
    const result = await this.sessionService.update(params);
    if (SELFIE_SUB_TYPES.DEVICE_REGISTRATION === input.sub_type) {
      await this.customerService.updateLastStep(
        currentUser.id,
        CUSTOMER_LAST_STEPS.RBX_ONB_STEP_SELFIE_UPLOADED
      );
    }
    return result;
  }

  @Post('liveness/upload')
  @ApiOperation({
    summary: 'Upload a liveness',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows face information.',
  })
  @ApiCreatedResponse({
    type: Document,
    description: 'Liveness image has been successfully uploaded.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async uploadLiveness(
    @CurrentUser() currentUser: User,
    @Body() input: UploadDocumentDTO
  ): Promise<Document> {
    const params: FaceUploadingInput = {
      file: input.file,
    };
    const result = await this.attachmentService.uploadLiveness(params);
    if (result?.status === DOCUMENT_STATUSES.PROCESSED) {
      await this.customerService.updateLastStep(
        currentUser.id,
        CUSTOMER_LAST_STEPS.RBX_ONB_STEP_LIVENESS_UPLOADED,
      );
    }
    return result;
  }
}
