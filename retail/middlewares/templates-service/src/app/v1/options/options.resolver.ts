/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  Resolver,
  Args,
  Info,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { OptionGQL } from './option.model';
import { Loader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { graphqlKeys } from '@common/utilities';
import { QuestionGQL } from '../questions/question.model';
import { QuestionLoader } from '../questions/question.loader';

@Resolver(OptionGQL)
export class OptionsResolver {
  constructor(private readonly optionService: OptionsService) {}

  @ResolveField(() => QuestionGQL)
  public async question(
    @Parent() option: OptionGQL,
    @Loader(QuestionLoader.name)
    questionLoader: DataLoader<QuestionGQL['id'], QuestionGQL>,
  ): Promise<QuestionGQL> {
    return questionLoader.load(option.question_id);
  }

  @Query(() => [OptionGQL])
  async optionsList(@Info() info): Promise<OptionGQL[]> {
    const keys = graphqlKeys(info);
    const result = this.optionService.list(keys);
    return result;
  }

  @Query(() => OptionGQL)
  async findOption(@Args('id') id: string, @Info() info): Promise<OptionGQL> {
    const keys = graphqlKeys(info);

    return this.optionService.findById(id, keys);
  }
}
