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
import DataLoader from '../../../lib/dataloader';
import { QuestionGQL } from '../questions/question.model';

@Resolver(SectionGQL)
export class SectionsResolver {
  constructor(private readonly sectionService: SectionsService) {}

  addRelationColumns(columns: string[]) {
    columns.push('template_id');
  }

  @ResolveField(() => TemplateGQL)
  public async template(
    @Fields(TemplateGQL) columns,
    @Parent() section: SectionGQL,
    @Loader(TemplateLoaderForSection.name)
    templateLoader: DataLoader<TemplateGQL['id'], TemplateGQL>,
  ): Promise<any> {
    return templateLoader.loadWithKeys(section.template_id, columns);
  }

  @ResolveField(() => [QuestionGQL])
  async questions(
    @Fields(QuestionGQL) columns,
    @Parent() section: SectionGQL,
    @Loader(QuestionLoaderForSection.name)
    questionLoader: DataLoader<QuestionGQL['id'], QuestionGQL>,
  ): Promise<any> {
    return questionLoader.loadWithKeys(section.id, columns);
  }

  @Query(() => [SectionGQL])
  async sectionsList(
    @Fields(SectionGQL) columns: string[],
  ): Promise<SectionGQL[]> {
    // this.addRelationColumns(columns);
    return this.sectionService.list(columns);
  }

  @Query(() => SectionGQL)
  async findSection(
    @Args('id') id: string,
    @Fields(SectionGQL) columns: string[],
  ): Promise<SectionGQL> {
    // this.addRelationColumns(columns);
    return this.sectionService.findById(id, columns);
  }
}
