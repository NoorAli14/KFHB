/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query, ResolveField, Parent } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { Question } from './question.model';
import { Loader } from 'nestjs-dataloader';
import DataLoader from '../../../lib/dataloader';
import { OptionLoaderForQuestion } from '@core/dataloaders/option.loader';
import { Option } from '@app/v1/options/option.model';
import { Fields } from '@common/decorators';
import { Section } from '../sections/section.model';
import { SectionLoaderForQuestion } from '@core/dataloaders';

@Resolver(Question)
export class QuestionsResolver {
  constructor(private readonly questionService: QuestionsService) {}

  @ResolveField(() => Section)
  public async section(
    @Fields(Section) columns,
    @Parent() question: Question,
    @Loader(SectionLoaderForQuestion.name)
    sectionLoader: DataLoader<Section['id'], Section>,
  ): Promise<any> {
    return sectionLoader.loadWithKeys(question.section_id, columns);
  }

  @ResolveField(() => [Option])
  async options(
    @Fields(Option) columns,
    @Parent() question: Question,
    @Loader(OptionLoaderForQuestion.name)
    optionLoader: DataLoader<Option['id'], Option>,
  ): Promise<any> {
    return optionLoader.loadWithKeys(question.id, columns);
  }

  @Query(() => [Question])
  async questionsList(
    @Fields(Question) columns: string[],
  ): Promise<Question[]> {
    return this.questionService.list(columns);
  }

  @Query(() => Question)
  async findQuestion(
    @Args('id') id: string,
    @Fields(Question) columns: string[],
  ): Promise<Question> {
    return this.questionService.findById(id, columns);
  }
}
