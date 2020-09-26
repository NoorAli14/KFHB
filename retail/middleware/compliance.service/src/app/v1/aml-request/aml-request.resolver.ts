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

  @Query(() => AmlRequest)
  async checkAmlByUserId(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('user_id') user_id: string,
    @Fields(AmlRequest) output: string[],
  ): Promise<AmlRequest> {
    // const amlRequest = await this.almRequestService.getAmlRequestByUserId(
    //   currentUser,
    //   user_id,
    //   output,
    // );
    // console.log(amlRequest, 'aml Request');
    const user = await this.almRequestService.findById(currentUser, user_id);
    const { result } = user?.data;
    if (!result) {
      throw new NotFoundException('User Not Found');
    }
    const response = await this.almRequestService.checkAmlByUser(
      currentUser,
      result,
      output,
    );

    console.log(response.status, '0-0-0-0-0');

    if (response && response.status === 'SUSPECT') {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Your aml request is under review.',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    } else if (response && response.status === 'BLOCK') {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Your aml request is blocked.',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
    return response;
  }

  @Mutation(() => AmlRequest)
  async addAmlRequest(
    @Args('id') user_id: string,
    @Fields(AmlRequest) columns: string[],
  ): Promise<AmlRequest> {
    const amlRequest: NewAlmRequestInput = {
      aml_text: 'Some',
      user_id: user_id,
      remarks: 'Testing',
      request_reference: 'some ref',
      status: 'SUCCESS',
      tenant_id: '9013C327-1190-4875-A92A-83ACA9029160',
    };
    return this.almRequestService.create(amlRequest, columns);
  }
}
