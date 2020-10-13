import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ICurrentUser } from '@common/interfaces';
import { CurrentUser } from '@common/decorators';
import { AttachmentsService } from './attachments.service';
import { NewAttachmentInput } from './attachment.dto';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

@Resolver()
export class AttachmentsResolver {
  constructor(private readonly attachmentService: AttachmentsService) {}

  @Mutation(() => String)
  async addAttachment(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('input') input: NewAttachmentInput,
  ): Promise<any> {
    return this.attachmentService.create(currentUser, input, [
      'id',
      'name',
      'created_on',
      'updated_on',
    ]);
  }

  @Query(() => String)
  async findAttachment(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('tag_name') tag_name: string,
  ): Promise<any> {
    return this.attachmentService.findByTagName(currentUser, tag_name, [
      'id',
      'name',
      'created_on',
      'updated_on',
    ]);
  }
}
