import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { SessionsService } from '../sessions/sessions.service';
import { FacesController } from './faces.controller';
import { CustomersService } from '../customers/customers.service';

@Module({
  imports: [GqlClientModule],
  controllers: [FacesController, DocumentsController],
  providers: [GqlClientService, DocumentsService, SessionsService, CustomersService],
})
export class DocumentModule { }
