/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Info, Query } from '@nestjs/graphql';
import { TemplateGQL } from './template.model';
import { TemplatesService } from './templates.service';
import { graphqlKeys } from '@common/utilities';

@Resolver(TemplateGQL)
export class TemplatesResolver {
  constructor(private readonly templateService: TemplatesService) {}

  @Query(() => [TemplateGQL])
  async templatesList(@Info() info): Promise<TemplateGQL[]> {
    const keys = graphqlKeys(info);
    return this.templateService.list(keys);
  }

  @Query(() => TemplateGQL)
  async findTemplate(
    @Args('id') id: string,
    @Info() info,
  ): Promise<TemplateGQL> {
    const keys = graphqlKeys(info);

    return this.templateService.findById(id, keys);
  }
}
