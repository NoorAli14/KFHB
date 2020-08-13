/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query } from '@nestjs/graphql';
import { TemplateGQL } from './template.model';
import { TemplatesService } from './templates.service';
import { Fields } from '@common/decorators';

@Resolver(TemplateGQL)
export class TemplatesResolver {
  constructor(private readonly templateService: TemplatesService) {}

  @Query(() => [TemplateGQL])
  async templatesList(@Fields() columns: string[]): Promise<TemplateGQL[]> {
    return this.templateService.list(columns);
  }

  @Query(() => TemplateGQL)
  async findTemplate(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<TemplateGQL> {
    return this.templateService.findById(id, columns);
  }
}
