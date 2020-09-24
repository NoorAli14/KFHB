/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Section } from './section.model';
import { SectionsService } from './sections.service';
import { Fields } from '@common/decorators';
import { Template } from '../templates/template.model';
import { Loader } from 'nestjs-dataloader';
import {
  TemplateLoaderForSection,
  QuestionLoaderForSection,
} from '@core/dataloaders';
import DataLoader from '../../../lib/dataloader';
import { Question } from '../questions/question.model';

@Resolver(Section)
export class SectionsResolver {
  constructor(private readonly sectionService: SectionsService) {}

  addRelationColumns(columns: string[]) {
    columns.push('template_id');
  }

  @ResolveField(() => Template)
  public async template(
    @Fields(Template) columns,
    @Parent() section: Section,
    @Loader(TemplateLoaderForSection.name)
    templateLoader: DataLoader<Template['id'], Template>,
  ): Promise<any> {
    // TODO: Find a way to pass selection keys to this function so Database query can be optimized.
    return templateLoader.loadWithKeys(section.template_id, columns);
  }

  @ResolveField(() => [Question])
  async questions(
    @Fields(Question) columns,
    @Parent() section: Section,
    @Loader(QuestionLoaderForSection.name)
    questionLoader: DataLoader<Question['id'], Question>,
  ): Promise<any> {
    return questionLoader.loadWithKeys(section.id, columns);
  }

  @Query(() => [Section])
  async sectionsList(@Fields(Section) columns: string[]): Promise<Section[]> {
    // this.addRelationColumns(columns);
    return this.sectionService.list(columns);
  }

  @Query(() => Section)
  async findSection(
    @Args('id') id: string,
    @Fields(Section) columns: string[],
  ): Promise<Section> {
    // this.addRelationColumns(columns);
    return this.sectionService.findById(id, columns);
  }
}
