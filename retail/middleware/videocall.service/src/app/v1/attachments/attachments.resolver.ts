import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ICurrentUser } from '@common/interfaces';
import { CurrentUser, Fields } from '@common/decorators';
import { AttachmentsService } from './attachments.service';
import { NewAttachmentInput } from './attachment.dto';
import { Attachment } from './attachment.model';

@Resolver()
export class AttachmentsResolver {
  constructor(private readonly attachmentService: AttachmentsService) {}

  @Query(() => [Attachment])
  async attachmentList(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('customer_id') customer_id: string,
    @Fields(Attachment) output: string[],
  ): Promise<Attachment[]> {
    return await this.attachmentService.list(currentUser, customer_id, output);
  }

  @Query(() => Attachment)
  async findAttachment(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('customer_id') customer_id: string,
    @Args('screenshot_id') screenshot_id: string,
    @Fields(Attachment) output: string[],
  ): Promise<Attachment> {
    return this.attachmentService.find(
      currentUser,
      customer_id,
      screenshot_id,
      output,
    );
  }

  @Mutation(() => Attachment)
  async addAttachment(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('input') input: NewAttachmentInput,
    @Fields(Attachment) output: string[],
  ): Promise<Attachment> {
    return this.attachmentService.create(currentUser, input, output);
  }
}
