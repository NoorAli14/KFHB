import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { SessionsService } from '../sessions/sessions.service';

import { FacesController } from './faces.controller';

@Module({
  imports: [GqlClientModule],
  controllers: [FacesController, DocumentsController],
  providers: [GqlClientService, DocumentsService, SessionsService],
})
export class DocumentModule { }
