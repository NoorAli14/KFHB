/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TemplateQuestionsService } from './template-questions.service';
import { TemplateQuestionGQL } from './template-question.model';
import { TemplateGQL } from '../templates/template.model';
import { QuestionGQL } from '../questions/question.model';
import { SectionGQL } from '../sections/section.model';
import { Loader } from 'nestjs-dataloader';
import { SectionLoaderForQuestion } from '../../../core/dataloaders/section.loader';
import * as DataLoader from 'dataloader';
import { TemplateLoaderForSection } from '../../../core/dataloaders/template.loader';
import { QuestionLoaderForOption } from '../../../core/dataloaders/question.loader';
import { Fields } from '@common/decorators';

@Resolver(TemplateQuestionGQL)
export class TemplateQuestionsResolver {
  constructor(
    private readonly templateQuestionsService: TemplateQuestionsService,
  ) {}

  @ResolveField(() => TemplateGQL)
  public async template(
    @Parent() templateQuestion: TemplateQuestionGQL,
    @Loader(TemplateLoaderForSection.name)
    templateLoader: DataLoader<TemplateGQL['id'], TemplateGQL>,
  ): Promise<any> {
    // TODO: Find a way to pass selection keys to this function so Database query can be optimized.
    return templateLoader.load(templateQuestion.id);
  }

  @ResolveField(() => QuestionGQL)
  public async question(
    @Parent() templateQuestion: TemplateQuestionGQL,
    @Loader(QuestionLoaderForOption.name)
    questionLoader: DataLoader<QuestionGQL['id'], QuestionGQL>,
  ): Promise<any> {
    return questionLoader.load(templateQuestion.id);
  }

  @ResolveField(() => SectionGQL)
  public async section(
    @Parent() templateQuestion: TemplateQuestionGQL,
    @Loader(SectionLoaderForQuestion.name)
    sectionLoader: DataLoader<SectionGQL['id'], SectionGQL>,
  ): Promise<any> {
    return sectionLoader.load(templateQuestion.id);
  }

  @Query(() => [TemplateQuestionGQL])
  async templatesQuestionsList(
    @Fields() columns: string[],
  ): Promise<TemplateQuestionGQL[]> {
    return this.templateQuestionsService.list(columns);
  }

  @Query(() => TemplateQuestionGQL)
  async findTemplateQuestion(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<TemplateQuestionGQL> {
    return this.templateQuestionsService.findById(id, columns);
  }
}
