import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TemplateResponseGQL } from './template-response.model';
import { TemplateResponsesService } from './template-responses.service';
import { NewTemplateResponseInput } from './template-response.dto';
import { Fields } from '@common/decorators';

@Resolver(TemplateResponseGQL)
export class TemplateResponsesResolver {
  constructor(
    private readonly templateResponseService: TemplateResponsesService,
  ) {}

  @Mutation(() => TemplateResponseGQL)
  async addTemplateResponse(
    @Args('input') input: NewTemplateResponseInput,
    @Fields() columns: string[],
  ): Promise<TemplateResponseGQL> {
    try {
      JSON.parse(input.results);
    } catch (error) {
      throw new Error("field 'results' should be a valid JSON.");
    }

    return this.templateResponseService.create(input, columns);
  }
}
