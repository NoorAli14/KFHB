import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { uuid, ICurrentUser } from '@rubix/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, Fields, CurrentUser } from '@rubix/common';
import { Document, PreviewDocument } from './document.model';
import { DocumentsService } from './documents.service';
import {
  NewDocumentInput,
  ProcessDocumentInput,
  PreviewDocumentInput,
} from './document.dto';

@Resolver(Document)
@UseGuards(AuthGuard)
export class DocumentsResolver {
  constructor(private readonly documentService: DocumentsService) {}

  @Mutation(() => Document)
  addDocument(
    @Args('input') input: NewDocumentInput,
    @CurrentUser() currentUser: ICurrentUser,
    @Fields() output: string[],
  ): Promise<Document> {
    return this.documentService.create(currentUser, input, output);
  }

  @Mutation(() => Document)
  processDocument(
    @Args('input') input: ProcessDocumentInput,
    @CurrentUser() currentUser: ICurrentUser,
    @Fields() output: string[],
  ): Promise<Document | Error> {
    return this.documentService.process(currentUser, input, output);
  }

  @UseGuards(AuthGuard)
  @Query(() => PreviewDocument)
  async previewAttachment(
    @Args('input') input: PreviewDocumentInput,
  ): Promise<PreviewDocument> {
    return this.documentService.preview(input);
  }
}
