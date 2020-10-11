/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Template } from './template.model';
import { TemplatesService } from './templates.service';
import { CurrentUser, Fields } from '@common/decorators';
import { Section } from '../sections/section.model';
import { Loader } from 'nestjs-dataloader';
import { SectionLoaderForTemplate } from '@core/dataloaders';
import DataLoader from '../../../lib/dataloader';
import { ICurrentUser } from '@common/interfaces';

@Resolver(Template)
export class TemplatesResolver {
  constructor(private readonly templateService: TemplatesService) {}

  @ResolveField(() => [Section])
  async sections(
    @Fields(Section) columns,
    @Parent() template: Template,
    @Loader(SectionLoaderForTemplate.name)
    sectionLoader: DataLoader<Section['id'], Section>,
  ): Promise<any> {
    return sectionLoader.loadWithKeys(template.id, columns);
  }

  @Query(() => [Template])
  async templatesList(
    @CurrentUser() currentUser: ICurrentUser,
    @Fields(Template) output: string[],
  ): Promise<Template[]> {
    return this.templateService.list(currentUser, output);
  }

  @Query(() => Template)
  async findTemplateByName(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('name') name: string,
    @Fields(Template) output: string[],
  ): Promise<Template> {
    return this.templateService.findByName(currentUser, name, output);
  }

  @Query(() => Template)
  async findTemplate(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('id') id: string,
    @Fields(Template) output: string[],
  ): Promise<Template> {
    return this.templateService.findById(currentUser, id, output);
  }
}
