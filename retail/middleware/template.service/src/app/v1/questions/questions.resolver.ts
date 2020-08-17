/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { QuestionGQL } from './question.model';
import { Loader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { OptionLoaderForQuestion } from '@core/dataloaders/option.loader';
import { OptionGQL } from '@app/v1/options/option.model';
import { Fields } from '@common/decorators';
import { SectionGQL } from '../sections/section.model';
import { SectionLoaderForQuestion } from '@core/dataloaders';

@Resolver(QuestionGQL)
export class QuestionsResolver {
  constructor(private readonly questionService: QuestionsService) {}

  addRelationColumns(columns: string[]) {
    columns.push('section_id');
  }

  @ResolveField(() => SectionGQL)
  public async section(
    @Parent() question: QuestionGQL,
    @Loader(SectionLoaderForQuestion.name)
    sectionLoader: DataLoader<SectionGQL['id'], SectionGQL>,
  ): Promise<any> {
    return sectionLoader.load(question.section_id);
  }

  @ResolveField(() => [OptionGQL])
  async options(
    @Parent() question: QuestionGQL,
    @Loader(OptionLoaderForQuestion.name)
    optionLoader: DataLoader<OptionGQL['id'], OptionGQL>,
  ): Promise<any> {
    return optionLoader.load(question.id);
  }

  @Query(() => [QuestionGQL])
  async questionsList(@Fields() columns: string[]): Promise<QuestionGQL[]> {
    this.addRelationColumns(columns);
    return this.questionService.list(columns);
  }

  @Query(() => QuestionGQL)
  async findQuestion(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<QuestionGQL> {
    this.addRelationColumns(columns);
    return this.questionService.findById(id, columns);
  }
}
