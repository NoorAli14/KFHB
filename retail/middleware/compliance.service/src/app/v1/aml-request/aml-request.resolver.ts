import { HttpStatus, NotFoundException, HttpException } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CurrentUser, Fields } from '@common/decorators';
import { AmlRequest } from './aml.request.model';
import { AmlRequestService } from './aml-request.service';
import { NewAlmRequestInput } from './aml-request-dot';
import { ICurrentUser, IHEADER } from '@common/interfaces';

@Resolver(AmlRequest)
export class AmlRequestResolver {
  constructor(private readonly almRequestService: AmlRequestService) {}

  @Mutation(() => AmlRequest)
  async amlScreening(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('user_id') user_id: string,
    @Fields(AmlRequest) output: string[],
  ): Promise<AmlRequest> {
    const amlRequest = await this.almRequestService.getAmlRequestByUserId(
      currentUser,
      user_id,
      output,
    );

    if (!amlRequest) {
      const user = await this.almRequestService.findById(currentUser, user_id);
      const amlRequest = await this.almRequestService.create(
        currentUser,
        user,
        output,
      );
      return this.almRequestService.triggerAml(amlRequest, output);
    }

    if (amlRequest.status === 'SUSPECT') {
      return this.almRequestService.triggerAml(amlRequest, output);
    }
    return amlRequest;
  }
}
