/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  Resolver,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { QuestionGQL } from './question.model';
import { Loader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { OptionLoader } from '@core/dataloaders/option.loader';
import { OptionGQL } from '@app/v1/options/option.model';
import { Fields } from '@common/decorators';

@Resolver(QuestionGQL)
export class QuestionsResolver {
  constructor(private readonly questionService: QuestionsService) {}

  @ResolveField(() => [OptionGQL])
  async options(
    @Parent() question: QuestionGQL,
    @Loader(OptionLoader.name)
    optionLoader: DataLoader<OptionGQL['id'], OptionGQL>,
  ): Promise<any> {
    return optionLoader.load(question.id);
  }

  @Query(() => [QuestionGQL])
  async questionsList(@Fields() columns: string[]): Promise<QuestionGQL[]> {
    return this.questionService.list(columns);
  }

  @Query(() => QuestionGQL)
  async findQuestion(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<QuestionGQL> {
    return this.questionService.findById(id, columns);
  }
}
