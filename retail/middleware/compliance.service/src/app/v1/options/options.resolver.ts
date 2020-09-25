/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  Resolver,
  Args,
  Query,
  Parent,
  ResolveField,
  Info,
} from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { Option } from './option.model';
import { Fields } from '@common/decorators';
import { Question } from '../questions/question.model';
import { Loader } from 'nestjs-dataloader';
import { QuestionLoaderForOption } from '@core/dataloaders';
import DataLoader from '../../../lib/dataloader';

@Resolver(Option)
export class OptionsResolver {
  constructor(private readonly optionService: OptionsService) {}

  @ResolveField(() => Question)
  public async question(
    @Fields(Question) columns,
    @Parent() option: Option,
    @Loader(QuestionLoaderForOption.name)
    questionLoader: DataLoader<Question['id'], Question>,
  ): Promise<any> {
    return questionLoader.loadWithKeys(option.question_id, columns);
  }

  @Query(() => [Option])
  async optionsList(@Fields(Option) columns: string[]): Promise<Option[]> {
    return this.optionService.list(columns);
  }

  @Query(() => Option)
  async findOption(
    @Args('id') id: string,
    @Info() info,
    @Fields(Option) columns: string[],
  ): Promise<Option> {
    return this.optionService.findById(id, columns);
  }
}
