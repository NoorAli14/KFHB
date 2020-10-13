import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ICurrentUser } from '@common/interfaces';
import { CurrentUser, Fields } from '@common/decorators';
import { AttachmentsService } from './attachments.service';
import { NewAttachmentInput } from './attachment.dto';
import { Attachment } from './attachment.model';

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

  @Query(() => Attachment)
  async findAttachment(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('user_id') user_id: string,
    @Args('screenshot_id') screenshot_id: string,
    @Fields(Attachment) output: string[],
  ): Promise<Attachment> {
    return this.attachmentService.find(
      currentUser,
      user_id,
      screenshot_id,
      output,
    );
  }
}
