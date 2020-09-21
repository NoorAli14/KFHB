import { Resolver, Args, Query } from '@nestjs/graphql';
import { AmlResponse } from './aml-response-model';
import { AmlResponseService } from './aml-response.service';
import { Fields } from '@common/decorators';

@Resolver(AmlResponse)
export class AmlResponseResolver {
  constructor(readonly amlResponseService: AmlResponseService) {}

  @Query(() => AmlResponse)
  async getAmlStatueByRefNo(
    @Args('reference_no') reference_no: string,
    @Args('user_id') user_id: string,
    @Fields(AmlResponse) columns: string[],
  ): Promise<AmlResponse> {
    return this.amlResponseService.getAmlStatus(user_id, reference_no, columns);
  }
}
