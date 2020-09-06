import { Module } from '@nestjs/common';
import { IdentityModule, IdentityService } from '@rubix/common/http/';

import {
  RepositoryModule,
  CustomerRepository,
  DocumentTypeRepository,
  SessionReferenceRepository,
} from '@rubix/core';
import { FacesResolver } from './faces.resolver';
import { FacesService } from './faces.service';

@Module({
  imports: [RepositoryModule, IdentityModule],
  providers: [
    FacesResolver,
    CustomerRepository,
    FacesService,
    IdentityService,
    DocumentTypeRepository,
    SessionReferenceRepository,
  ],
})
export class FaceModule {}
