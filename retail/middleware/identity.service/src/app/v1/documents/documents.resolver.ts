import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { uuid, ICurrentUser } from '@rubix/common';
import { UseGuards } from '@nestjs/common';
import {
  AuthGuard,
  Fields,
  CurrentUser,
  Tenant,
  DOCUMENT_STATUSES,
} from '@rubix/common';
import { Document } from './document.model';
import { DocumentsService } from './documents.service';
import { NewDocumentInput, ProcessDocumentInput } from './document.dto';

@Resolver(Document)
@UseGuards(AuthGuard)
export class DocumentsResolver {
  constructor(private readonly documentService: DocumentsService) {}

  @Mutation(() => Document)
  addDocument(
    @Args('input') input: NewDocumentInput,
    @CurrentUser() currentUser: ICurrentUser,
    @Fields() columns: string[],
  ): Promise<Document> {
    return this.documentService.create(currentUser, input, columns);
  }

  @Mutation(() => Document)
  processDocument(
    @Args('input') input: ProcessDocumentInput,
    @CurrentUser() customer: any,
    @Tenant() tenant: any,
    @Fields() columns: string[],
  ): Promise<Document> {
    const params: any = {
      ...input,
      ...{
        customer_id: customer.id,
        tenant_id: tenant.id,
        updated_by: customer.id,
      },
    };
    return this.documentService.process(params, columns);
  }
}
