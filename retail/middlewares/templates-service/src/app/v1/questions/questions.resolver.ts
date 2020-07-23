/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Info, Query } from '@nestjs/graphql';
import { graphqlKeys } from '@common/utilities';
import { QuestionsService } from './questions.service';
import { QuestionGQL } from './question.model';

@Resolver('Questions')
export class QuestionsResolver {
  constructor(private readonly questionService: QuestionsService) {}

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
