/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TemplateQuestionsService } from './template-questions.service';
import { TemplateQuestionGQL } from './template-question.model';
import { Template } from '../templates/template.model';
import { Question } from '../questions/question.model';
import { Section } from '../sections/section.model';
import { Loader } from 'nestjs-dataloader';
import DataLoader from '../../../lib/dataloader';
import { Fields } from '@common/decorators';
import { SectionLoaderForTemplateQuestion } from '../../../core/dataloaders/section.loader';
import { QuestionLoaderForTemplateQuestion } from '../../../core/dataloaders/question.loader';
import { TemplateLoaderForTemplateQuestion } from '../../../core/dataloaders/template.loader';

@Resolver(TemplateQuestionGQL)
export class TemplateQuestionsResolver {
  constructor(
    private readonly templateQuestionsService: TemplateQuestionsService,
  ) {}

  @ResolveField(() => Template)
  public async template(
    @Fields(Template) columns,
    @Parent() templateQuestion: TemplateQuestionGQL,
    @Loader(TemplateLoaderForTemplateQuestion.name)
    templateLoader: DataLoader<Template['id'], Template>,
  ): Promise<any> {
    return templateLoader.loadWithKeys(templateQuestion.template_id, columns);
  }

  @ResolveField(() => Question)
  public async question(
    @Fields(Template) columns,
    @Parent() templateQuestion: TemplateQuestionGQL,
    @Loader(QuestionLoaderForTemplateQuestion.name)
    questionLoader: DataLoader<Question['id'], Question>,
  ): Promise<any> {
    return questionLoader.loadWithKeys(templateQuestion.question_id, columns);
  }

  @ResolveField(() => Section)
  public async section(
    @Fields(Template) columns,
    @Parent() templateQuestion: TemplateQuestionGQL,
    @Loader(SectionLoaderForTemplateQuestion.name)
    sectionLoader: DataLoader<Section['id'], Section>,
  ): Promise<any> {
    return sectionLoader.loadWithKeys(templateQuestion.section_id, columns);
  }

  @Query(() => [TemplateQuestionGQL])
  async templatesQuestionsList(
    @Fields(TemplateQuestionGQL) columns: string[],
  ): Promise<TemplateQuestionGQL[]> {
    return this.templateQuestionsService.list(columns);
  }

  @Query(() => TemplateQuestionGQL)
  async findTemplateQuestion(
    @Args('id') id: string,
    @Fields(TemplateQuestionGQL) columns: string[],
  ): Promise<TemplateQuestionGQL> {
    return this.templateQuestionsService.findById(id, columns);
  }
}
