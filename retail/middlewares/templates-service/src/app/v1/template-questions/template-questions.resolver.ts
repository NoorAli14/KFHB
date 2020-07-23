/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Query, Args, Info } from '@nestjs/graphql';
import { TemplateQuestionsService } from './template-questions.service';
import { TemplateQuestionGQL } from './template-question.model';
import { graphqlKeys } from '@common/utilities';

@Resolver('TemplateQuestions')
export class TemplateQuestionsResolver {
  constructor(private readonly templateQuestionsService: TemplateQuestionsService) {}

  @Query(() => [TemplateQuestionGQL])
  async templatesQuestionsList(@Info() info): Promise<TemplateQuestionGQL[]> {
    const keys = graphqlKeys(info);
    return this.templateQuestionsService.list(keys);
  }

  @Query(() => TemplateQuestionGQL)
  async findTemplateQuestion(
    @Args('id') id: string,
    @Info() info,
  ): Promise<TemplateQuestionGQL> {
    const keys = graphqlKeys(info);

    return this.templateQuestionsService.findById(id, keys);
  }
}
