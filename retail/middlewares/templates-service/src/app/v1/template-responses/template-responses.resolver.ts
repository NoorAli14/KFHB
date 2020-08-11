import { Resolver, Mutation, Args, Info } from '@nestjs/graphql';
import { TemplateResponseGQL } from './template-response.model';
import { graphqlKeys } from '@common/utilities';
import { TemplateResponsesService } from './template-responses.service';
import { NewTemplateResponseInput } from './template-response.dto';

@Resolver(TemplateResponseGQL)
export class TemplateResponsesResolver {
  constructor(
    private readonly templateResponseService: TemplateResponsesService,
  ) {}

  @Mutation(() => TemplateResponseGQL)
  async addTemplateResponse(
    @Args('input') input: NewTemplateResponseInput,
    @Info() info: Record<string, any>,
  ): Promise<TemplateResponseGQL> {
    try {
      JSON.parse(input.results);
    } catch (error) {
      throw new Error("field 'results' should contain valid JSON format data.");
    }

    const keys = graphqlKeys(info);

    return this.templateResponseService.create(input, keys);
  }
}
