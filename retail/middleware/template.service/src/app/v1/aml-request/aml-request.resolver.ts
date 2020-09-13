import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Fields } from '@common/decorators';
import { AmlRequest } from './aml.request.model';
import { AmlRequestService } from './aml-request.service';
import { NewAlmRequestInput } from './aml-request-dot';

@Resolver(AmlRequest)
export class AmlRequestResolver {
  constructor(private readonly almRequestService: AmlRequestService) {}

  @Query(() => AmlRequest)
  async checkAmlByUserId(
    @Args('id') user_id: string,
    @Fields(AmlRequest) columns: string[],
  ): Promise<AmlRequest> {
    const user = await this.almRequestService.findUserById(user_id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return this.almRequestService.checkAmlByUser(user);
  }

  @Mutation(() => AmlRequest)
  async addAmlRequest(
    @Args('input') input: NewAlmRequestInput,
    @Fields(AmlRequest) columns: string[],
  ): Promise<AmlRequest> {
    try {
      // Need to verify this check
      JSON.parse(input.remarks);
    } catch (error) {
      throw new Error("Field 'results' should be a valid JASON.");
    }

    return this.almRequestService.create(input, columns);
  }
}
