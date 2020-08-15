/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Query } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { OptionGQL } from './option.model';
import { Fields } from '@common/decorators';

@Resolver(OptionGQL)
export class OptionsResolver {
  constructor(private readonly optionService: OptionsService) {}

  @Query(() => [OptionGQL])
  async optionsList(@Fields() columns: string[]): Promise<OptionGQL[]> {
    const result = this.optionService.list(columns);
    return result;
  }

  @Query(() => OptionGQL)
  async findOption(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<OptionGQL> {
    return this.optionService.findById(id, columns);
  }
}
