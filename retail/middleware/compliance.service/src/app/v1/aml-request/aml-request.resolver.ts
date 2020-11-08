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
import { AmlRequestNotFoundException } from './exceptions';
import { AlmRequestAlertInput } from './aml-request-dto';
import { AML_REQUEST_STATUSES } from '@common/constants';

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
      [
        'id',
        'aml_text',
        'tenant_id',
        'request_reference',
        'status',
        'user_id',
        'created_by',
        'created_on',
        'updated_by',
        'updated_on',
      ],
    );

    if (!amlRequest) {
      const user = await this.almRequestService.findById(currentUser, user_id);
      const amlRequest = await this.almRequestService.create(
        currentUser,
        user,
        [
          'id',
          'aml_text',
          'tenant_id',
          'request_reference',
          'status',
          'user_id',
          'created_by',
          'created_on',
          'updated_by',
          'updated_on',
        ],
      );
      return this.almRequestService.triggerAml(amlRequest, output);
    }

    if (
      amlRequest?.status === AML_REQUEST_STATUSES.SUSPECT ||
      amlRequest?.status === AML_REQUEST_STATUSES.PENDING
    ) {
      return this.almRequestService.triggerAml(amlRequest, output);
    }
    return amlRequest;
  }

  @Mutation(() => AmlRequest)
  async amlAlert(
    @Args('input') input: AlmRequestAlertInput,
    @Fields(AmlRequest) output: string[],
  ): Promise<AmlRequest> {
    const amlRequest: AmlRequest = await this.almRequestService.getAmlRequestByReferenceNo(
      input.reference_no,
      [
        'id',
        'aml_text',
        'tenant_id',
        'request_reference',
        'status',
        'user_id',
        'created_by',
        'created_on',
        'updated_by',
        'updated_on',
      ],
    );

    if (!amlRequest) {
      throw new AmlRequestNotFoundException();
    }

    if (
      amlRequest?.status === AML_REQUEST_STATUSES.SUSPECT ||
      amlRequest?.status === AML_REQUEST_STATUSES.PENDING
    ) {
      return this.almRequestService.amlAlert(input, output);
    }
    return amlRequest;
  }
}
