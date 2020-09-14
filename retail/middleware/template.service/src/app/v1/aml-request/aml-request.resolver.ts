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
    @Args('id') user_id: string,
    @Fields(AmlRequest) columns: string[],
  ): Promise<AmlRequest> {
    const amlRequest: NewAlmRequestInput = {
      aml_text: 'Some',
      customer_id: user_id,
      remarks: 'Testing',
      request_reference: 'some ref',
      status: 'SUCCESS',
      tenant_id: '9013C327-1190-4875-A92A-83ACA9029160',
    };
    // const request = await this.almRequestService.create(amlRequest);
    return this.almRequestService.create(amlRequest, columns);
  }
}
