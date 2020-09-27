import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { ICurrentUser } from '@rubix/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, Fields, CurrentUser } from '@rubix/common';
import { Document, PreviewDocument, ResultUnion, CUSTOM_ERROR } from './document.model';
import { DocumentsService } from './documents.service';
import {
  NewDocumentInput,
  ProcessDocumentInput,
  PreviewDocumentInput,
} from './document.dto';

@Resolver(Document)
@UseGuards(AuthGuard)
export class DocumentsResolver {
  constructor(private readonly documentService: DocumentsService) { }

  @Mutation(() => Document)
  addDocument(
    @Args('input') input: NewDocumentInput,
    @CurrentUser() currentUser: ICurrentUser,
    @Fields() output: string[],
  ): Promise<Document> {
    return this.documentService.create(currentUser, input, output);
  }

  @Mutation(() => ResultUnion)
  processDocument(
    @Args('input') input: ProcessDocumentInput,
    @CurrentUser() currentUser: ICurrentUser,
    @Info() info: any,
    @Fields({ type: 'Document' }) output: string[],
  ): Promise<Document | CUSTOM_ERROR> {
    console.log('Document: ' + JSON.stringify(output, null, 2))
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
