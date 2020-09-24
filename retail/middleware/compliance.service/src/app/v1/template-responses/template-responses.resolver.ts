import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TemplateResponse } from './template-response.model';
import { TemplateResponsesService } from './template-responses.service';
import { NewTemplateResponseInput } from './template-response.dto';
import { CurrentUser, Fields } from '@common/decorators';
import { ICurrentUser } from '@common/interfaces';

@Resolver(TemplateResponse)
export class TemplateResponsesResolver {
  constructor(
    private readonly templateResponseService: TemplateResponsesService,
  ) {}

  @Query(() => [TemplateResponse])
  async findTemplateResponseByUserId(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('user_id') user_id: string,
    @Fields(TemplateResponse) output: string[],
  ): Promise<TemplateResponse[]> {
    const result: TemplateResponse[] = await this.templateResponseService.findByUserId(
      currentUser,
      user_id,
      output,
    );

    return result || [];
  }

  @Mutation(() => TemplateResponse)
  async addTemplateResponse(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('input') input: NewTemplateResponseInput,
    @Fields(TemplateResponse) output: string[],
  ): Promise<TemplateResponse> {
    return this.templateResponseService.create(currentUser, input, output);
  }
}
