import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { AttachmentsController } from './attachments.controller';

import { DocumentsController } from './documents.controller';
import { AttachmentsService } from './attachments.service';
import { SessionsService } from '../sessions/sessions.service';

import { FacesController } from './faces.controller';

@Module({
  imports: [GqlClientModule],
  controllers: [AttachmentsController, FacesController, DocumentsController],
  providers: [GqlClientService, AttachmentsService, SessionsService],
})
export class AttachmentModule {}
