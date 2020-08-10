/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Resolver, Args, Info, Query } from '@nestjs/graphql';
import { OptionsService } from './options.service';
import { OptionGQL } from './option.model';
import { graphqlKeys } from '@common/utilities';

@Resolver(OptionGQL)
export class OptionsResolver {
  constructor(private readonly optionService: OptionsService) {}

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
