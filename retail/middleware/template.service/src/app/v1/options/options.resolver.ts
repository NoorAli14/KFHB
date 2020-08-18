/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query, Parent, ResolveField } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { OptionGQL } from './option.model';
import { Fields } from '@common/decorators';
import { QuestionGQL } from '../questions/question.model';
import { Loader } from 'nestjs-dataloader';
import { QuestionLoaderForOption } from '@core/dataloaders';
import DataLoader from 'dataloader';

@Resolver(OptionGQL)
export class OptionsResolver {
  constructor(private readonly optionService: OptionsService) {}

  addRelationColumns(columns: string[]) {
    columns.push('question_id');
  }

  @ResolveField(() => QuestionGQL)
  public async question(
    @Parent() option: OptionGQL,
    @Loader(QuestionLoaderForOption.name)
    questionLoader: DataLoader<QuestionGQL['id'], QuestionGQL>,
  ): Promise<any> {
    return questionLoader.load(option.question_id);
  }

  @Query(() => [OptionGQL])
  async optionsList(@Fields() columns: string[]): Promise<OptionGQL[]> {
    this.addRelationColumns(columns);
    return this.optionService.list(columns);
  }

  @Query(() => OptionGQL)
  async findOption(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<OptionGQL> {
    this.addRelationColumns(columns);
    return this.optionService.findById(id, columns);
  }
}
