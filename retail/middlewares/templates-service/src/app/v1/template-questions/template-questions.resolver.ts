/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  Resolver,
  Query,
  Args,
  Info,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TemplateQuestionsService } from './template-questions.service';
import { TemplateQuestionGQL } from './template-question.model';
import { graphqlKeys } from '@common/utilities';
import { TemplateGQL } from '../templates/template.model';
import { QuestionGQL } from '../questions/question.model';
import { SectionGQL } from '../sections/section.model';
import { Loader } from 'nestjs-dataloader';
import { SectionLoader } from '../sections/section.loader';
import * as DataLoader from 'dataloader';
import { TemplateLoader } from '../templates/template.loader';
import { QuestionLoader } from '../questions/question.loader';

@Resolver(TemplateQuestionGQL)
export class TemplateQuestionsResolver {
  constructor(
    private readonly templateQuestionsService: TemplateQuestionsService,
  ) {}

  @ResolveField(() => TemplateGQL)
  public async template(
    @Parent() templateQuestion: TemplateQuestionGQL,
    @Loader(TemplateLoader.name)
    templateLoader: DataLoader<TemplateGQL['id'], TemplateGQL>,
  ): Promise<any> {
    // TODO: Find a way to pass selection keys to this function so Database query can be optimized.
    return templateLoader.load(templateQuestion.id);
  }

  @ResolveField(() => QuestionGQL)
  public async question(
    @Parent() templateQuestion: TemplateQuestionGQL,
    @Loader(QuestionLoader.name)
    questionLoader: DataLoader<QuestionGQL['id'], QuestionGQL>,
  ): Promise<any> {
    return questionLoader.load(templateQuestion.id);
  }

  @ResolveField(() => SectionGQL)
  public async section(
    @Parent() templateQuestion: TemplateQuestionGQL,
    @Loader(SectionLoader.name)
    sectionLoader: DataLoader<SectionGQL['id'], SectionGQL>,
  ): Promise<any> {
    return sectionLoader.load(templateQuestion.id);
  }

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
