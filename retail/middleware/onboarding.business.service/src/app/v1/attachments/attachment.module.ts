import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { DocumentsController } from './documents.controller';
import { AttachmentsService } from './attachments.service';
import { SessionsService } from '../sessions/sessions.service';

import { FacesController } from './faces.controller';

@Module({
  imports: [GqlClientModule],
  controllers: [FacesController, DocumentsController],
  providers: [
    FacesController,
    DocumentsController,
    GqlClientService,
    AttachmentsService,
    SessionsService,
  ],
})
export class AttachmentModule {}
