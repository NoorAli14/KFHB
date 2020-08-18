/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { SectionGQL } from './section.model';
import { SectionsService } from './sections.service';
import { Fields } from '@common/decorators';
import { TemplateGQL } from '../templates/template.model';
import { Loader } from 'nestjs-dataloader';
import {
  TemplateLoaderForSection,
  QuestionLoaderForSection,
} from '@core/dataloaders';
import DataLoader from 'dataloader';
import { QuestionGQL } from '../questions/question.model';

@Resolver(SectionGQL)
export class SectionsResolver {
  constructor(private readonly sectionService: SectionsService) {}

  addRelationColumns(columns: string[]) {
    columns.push('template_id');
  }

  @ResolveField(() => TemplateGQL)
  public async template(
    @Parent() section: SectionGQL,
    @Loader(TemplateLoaderForSection.name)
    templateLoader: DataLoader<TemplateGQL['id'], TemplateGQL>,
  ): Promise<any> {
    // TODO: Find a way to pass selection keys to this function so Database query can be optimized.
    return templateLoader.load(section.template_id);
  }

  @ResolveField(() => [QuestionGQL])
  async questions(
    @Parent() section: SectionGQL,
    @Loader(QuestionLoaderForSection.name)
    questionLoader: DataLoader<QuestionGQL['id'], QuestionGQL>,
  ): Promise<any> {
    return questionLoader.load(section.id);
  }

  @Query(() => [SectionGQL])
  async sectionsList(@Fields() columns: string[]): Promise<SectionGQL[]> {
    this.addRelationColumns(columns);
    return this.sectionService.list(columns);
  }

  @Query(() => SectionGQL)
  async findSection(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<SectionGQL> {
    this.addRelationColumns(columns);
    return this.sectionService.findById(id, columns);
  }
}
