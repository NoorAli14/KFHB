/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query } from '@nestjs/graphql';
import { SectionGQL } from './section.model';
import { SectionsService } from './sections.service';
import { Fields } from '@common/decorators';

@Resolver(SectionGQL)
export class SectionsResolver {
  constructor(private readonly sectionService: SectionsService) {}

  @Query(() => [SectionGQL])
  async sectionsList(@Fields() columns: string[]): Promise<SectionGQL[]> {
    return this.sectionService.list(columns);
  }

  @Query(() => SectionGQL)
  async findSection(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<SectionGQL> {
    return this.sectionService.findById(id, columns);
  }
}
