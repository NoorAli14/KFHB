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
import { OptionGQL } from '../options/option.model';
import { Loader } from 'nestjs-dataloader';
import { OptionLoader } from '../options/option.loader';
import * as DataLoader from 'dataloader';
import { QuestionLoader } from './question.loader';

@Resolver(QuestionGQL)
export class QuestionsResolver {
  constructor(private readonly questionService: QuestionsService) {}

  @ResolveField(() => [OptionGQL])
  public async options(
    @Parent() question: QuestionGQL,
    @Loader(OptionLoader.name)
    optionLoader: DataLoader<OptionGQL['id'], OptionGQL>,
  ): Promise<(OptionGQL | Error)[]> {
    return optionLoader.loadMany([question.id]);
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
