/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Info, Query } from '@nestjs/graphql';
import { SectionGQL } from './section.model';
import { SectionsService } from './sections.service';
import { graphqlKeys } from '@common/utilities';

@Resolver(SectionGQL)
export class SectionsResolver {
  constructor(private readonly sectionService: SectionsService) {}

  @Query(() => [SectionGQL])
  async sectionsList(@Info() info): Promise<SectionGQL[]> {
    const keys = graphqlKeys(info);
    return this.sectionService.list(keys);
  }

  @Query(() => SectionGQL)
  async findSection(
    @Args('id') id: string,
    @Info() info,
  ): Promise<SectionGQL> {
    const keys = graphqlKeys(info);

    return this.sectionService.findById(id, keys);
  }
}
