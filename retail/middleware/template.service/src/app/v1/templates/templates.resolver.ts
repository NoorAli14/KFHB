/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { TemplateGQL } from './template.model';
import { TemplatesService } from './templates.service';
import { Fields } from '@common/decorators';
import { SectionGQL } from '../sections/section.model';
import { Loader } from 'nestjs-dataloader';
import { SectionLoaderForTemplate } from '@core/dataloaders';
import DataLoader from 'dataloader';

@Resolver(TemplateGQL)
export class TemplatesResolver {
  constructor(private readonly templateService: TemplatesService) {}

  @ResolveField(() => [SectionGQL])
  async sections(
    @Parent() template: TemplateGQL,
    @Loader(SectionLoaderForTemplate.name)
    sectionLoader: DataLoader<SectionGQL['id'], SectionGQL>,
  ): Promise<any> {
    return sectionLoader.load(template.id);
  }

  @Query(() => [TemplateGQL])
  async templatesList(@Fields() columns: string[]): Promise<TemplateGQL[]> {
    return this.templateService.list(columns);
  }

  @Query(() => TemplateGQL)
  async findTemplateByName(
    @Args('name') name: string,
    @Fields() columns: string[],
  ): Promise<TemplateGQL> {
    return this.templateService.findByName(name, columns);
  }

  @Query(() => TemplateGQL)
  async findTemplate(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<TemplateGQL> {
    return this.templateService.findById(id, columns);
  }
}
