import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CurrentUser, Fields } from '@common/decorators';
import { AmlRequest } from './aml.request.model';
import { AmlRequestService } from './aml-request.service';
import { ICurrentUser } from '@common/interfaces';
import { AmlResponse } from '../aml-response/aml-response-model';
import { Loader } from 'nestjs-dataloader';
import DataLoader from '../../../lib/dataloader';
import { AmlResponseLoader } from '@core/dataloaders/aml-response.loader';

@Resolver(AmlRequest)
export class AmlRequestResolver {
  constructor(private readonly almRequestService: AmlRequestService) {}

  @Query(() => [AmlRequest])
  async amlListByUserId(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('user_id') user_id: string,
    @Fields(AmlRequest) output: string[],
  ): Promise<AmlRequest[]> {
    return this.almRequestService.list(currentUser, user_id, output);
  }

  @ResolveField(() => [AmlResponse])
  async responses(
    @Fields(AmlResponse) output: string[],
    @Parent() amlRequest: AmlRequest,
    @Loader(AmlResponseLoader.name)
    responseLoader: DataLoader<AmlResponse['id'], AmlResponse>,
  ): Promise<any> {
    return responseLoader.loadWithKeys(amlRequest.id, output);
  }

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
