/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { QuestionGQL } from './question.model';
import { Loader } from 'nestjs-dataloader';
import DataLoader from '../../../lib/dataloader';
import { OptionLoaderForQuestion } from '@core/dataloaders/option.loader';
import { OptionGQL } from '@app/v1/options/option.model';
import { Fields } from '@common/decorators';
import { SectionGQL } from '../sections/section.model';
import { SectionLoaderForQuestion } from '@core/dataloaders';

@Resolver(QuestionGQL)
export class QuestionsResolver {
  constructor(private readonly questionService: QuestionsService) {}

  @ResolveField(() => SectionGQL)
  public async section(
    @Fields(SectionGQL) columns,
    @Parent() question: QuestionGQL,
    @Loader(SectionLoaderForQuestion.name)
    sectionLoader: DataLoader<SectionGQL['id'], SectionGQL>,
  ): Promise<any> {
    return sectionLoader.loadWithKeys(question.section_id, columns);
  }

  @ResolveField(() => [OptionGQL])
  async options(
    @Fields(OptionGQL) columns,
    @Parent() question: QuestionGQL,
    @Loader(OptionLoaderForQuestion.name)
    optionLoader: DataLoader<OptionGQL['id'], OptionGQL>,
  ): Promise<any> {
    return optionLoader.loadWithKeys(question.id, columns);
  }

  @Query(() => [QuestionGQL])
  async questionsList(@Fields(QuestionGQL) columns: string[]): Promise<QuestionGQL[]> {
    return this.questionService.list(columns);
  }

  @Query(() => QuestionGQL)
  async findQuestion(
    @Args('id') id: string,
    @Fields(QuestionGQL) columns: string[],
  ): Promise<QuestionGQL> {
    return this.questionService.findById(id, columns);
  }
}
