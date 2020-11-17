import { Module } from '@nestjs/common';
import { IdentityModule, IdentityService } from '@rubix/common/connectors';

import {
  RepositoryModule,
  CustomerRepository,
  DocumentTypeRepository,
  SessionReferenceRepository,
} from '@rubix/core';
import { DocumentsResolver } from './documents.resolver';
import { DocumentsService } from './documents.service';
import { SchemaService } from './schema.service';
@Module({
  imports: [RepositoryModule, IdentityModule],
  providers: [
    DocumentsService,
    CustomerRepository,
    DocumentsResolver,
    IdentityService,
    DocumentTypeRepository,
    SessionReferenceRepository,
    SchemaService
  ],
})
export class DocumentModule { }
