/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query, Parent, ResolveField } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { OptionGQL } from './option.model';
import { Fields } from '@common/decorators';
import { QuestionGQL } from '../questions/question.model';
import { Loader } from 'nestjs-dataloader';
import { QuestionLoaderForOption } from '@core/dataloaders';
import DataLoader from '../../../lib/dataloader';

@Resolver(OptionGQL)
export class OptionsResolver {
  constructor(private readonly optionService: OptionsService) {}

  @ResolveField(() => QuestionGQL)
  public async question(
    @Fields(QuestionGQL) columns,
    @Parent() option: OptionGQL,
    @Loader(QuestionLoaderForOption.name)
    questionLoader: DataLoader<QuestionGQL['id'], QuestionGQL>,
  ): Promise<any> {
    return questionLoader.loadWithKeys(option.question_id, columns);
  }

  @Query(() => [OptionGQL])
  async optionsList(
    @Fields(OptionGQL) columns: string[],
  ): Promise<OptionGQL[]> {
    return this.optionService.list(columns);
  }

  @Query(() => OptionGQL)
  async findOption(
    @Args('id') id: string,
    @Fields(OptionGQL) columns: string[],
  ): Promise<OptionGQL> {
    return this.optionService.findById(id, columns);
  }
}
