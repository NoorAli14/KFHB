/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  Resolver,
  Args,
  Info,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { graphqlKeys } from '@common/utilities';
import { QuestionsService } from './questions.service';
import { QuestionGQL } from './question.model';
import { Loader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { OptionLoader } from '@app/v1/options/option.loader';
import { OptionGQL } from '@app/v1/options/option.model';

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
  async questionsList(@Info() info): Promise<QuestionGQL[]> {
    const keys = graphqlKeys(info);
    return this.questionService.list(keys);
  }

  @Query(() => QuestionGQL)
  async findQuestion(
    @Args('id') id: string,
    @Info() info,
  ): Promise<QuestionGQL> {
    const keys = graphqlKeys(info);

    return this.questionService.findById(id, keys);
  }
}
