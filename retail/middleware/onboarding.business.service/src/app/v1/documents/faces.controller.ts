import { Controller, Body, UseGuards, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@common/index';
import { DocumentsService as FaceService } from './documents.service';
import { Document } from './document.entity';
import { UploadDocumentDTO, UploadSelfieDTO } from './document.dto';
import { FaceUploadingInput } from './document.interface';
import { SessionsService } from '../sessions/sessions.service';
import { Session } from '../sessions/session.entity';

@ApiTags('Face Images Uploading Module')
@Controller('faces')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class FacesController {
  constructor(
    private readonly attachmentService: FaceService,
    private readonly sessionService: SessionsService,
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
  async uploadSelfie(@Body() input: UploadSelfieDTO): Promise<Session> {
    const params: FaceUploadingInput = {
      file: input.file,
    };
    return this.sessionService.update(params);
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
  async uploadLiveness(@Body() input: UploadDocumentDTO): Promise<Document> {
    const params: FaceUploadingInput = {
      file: input.file,
    };
    return this.attachmentService.uploadLiveness(params);
  }
}
