import { Module } from '@nestjs/common';
import { IdentityModule, IdentityService } from '@rubix/common/connectors';

import {
  RepositoryModule,
  SessionRepository,
  CustomerRepository,
  SessionReferenceRepository,
  DocumentTypeRepository
} from '@rubix/core';
import { SessionsResolver } from './sessions.resolver';
import { SessionsService } from './sessions.service';
import { SchemaService } from '../documents/schema.service';
@Module({
  imports: [RepositoryModule, IdentityModule],
  providers: [
    SessionsService,
    SessionRepository,
    CustomerRepository,
    SessionsResolver,
    IdentityService,
    DocumentTypeRepository,
    SessionReferenceRepository,
    SchemaService
  ],
})
export class SessionModule { }
