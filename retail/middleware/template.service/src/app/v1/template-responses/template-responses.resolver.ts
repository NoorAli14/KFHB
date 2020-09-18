import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TemplateResponseGQL } from './template-response.model';
import { TemplateResponsesService } from './template-responses.service';
import { NewTemplateResponseInput } from './template-response.dto';
import { Fields } from '@common/decorators';

@Resolver(TemplateResponseGQL)
export class TemplateResponsesResolver {
  constructor(
    private readonly templateResponseService: TemplateResponsesService,
  ) {}

  // @Query(() => [TemplateResponseGQL])
  // async templatesResponseList(
  //   @Fields(TemplateResponseGQL) columns: string[],
  // ): Promise<TemplateResponseGQL[]> {
  //   return this.templateResponseService.list(columns);
  // }

  @Query(() => [TemplateResponseGQL])
  async findTemplateResponseByUserId(
    @Args('user_id') user_id: string,
    @Fields(TemplateResponseGQL) columns: string[],
  ): Promise<TemplateResponseGQL[]> {
    const result = this.templateResponseService.findByUserId(user_id, columns);
    if (!result) throw new Error('No Record found for this User.');
    return result;
  }

  @Mutation(() => TemplateResponseGQL)
  async addTemplateResponse(
    @Args('input') input: NewTemplateResponseInput,
    @Fields(TemplateResponseGQL) columns: string[],
  ): Promise<TemplateResponseGQL> {
    // try {
    //   JSON.parse(input.results);
    // } catch (error) {
    //   throw new Error("field 'results' should be a valid JSON.");
    // }

    return this.templateResponseService.create(input, columns);
  }
}
