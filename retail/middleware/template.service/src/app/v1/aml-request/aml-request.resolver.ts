import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { Fields } from '@common/decorators';
import { AmlRequest } from './aml.request.model';
import { AmlRequestService } from './aml-request.service';

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
}
