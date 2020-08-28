import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { graphqlKeys } from '@common/utilities';
import { KeyValInput } from '@common/inputs/key-val.input';
import { Holiday } from '@app/v1/holiday/holiday.model';
import { HolidaysService } from '@app/v1/holiday/holidays.service';
import { HolidayInput } from '@app/v1/holiday/holiday.dto';

@Resolver(Holiday)
export class HolidaysResolver {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Query(() => [Holiday])
  async holidaysList(@Info() info): Promise<Holiday[]> {
    const keys = graphqlKeys(info);
    return this.holidaysService.list(keys);
  }

  @Query(() => Holiday)
  async findHolidayById(
    @Args('id') id: string,
    @Info() info,
  ): Promise<Holiday> {
    const keys = graphqlKeys(info);
    return this.holidaysService.findById(id, keys);
  }

  @Query(() => [Holiday])
  async findHolidayBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Info() info,
  ): Promise<Holiday[]> {
    const keys = graphqlKeys(info);
    return this.holidaysService.findByProperty(checks, keys);
  }

  @Mutation(() => Holiday)
  async addHoliday(
    @Args('input') input: HolidayInput,
    @Info() info,
  ): Promise<Holiday> {
    const keys = graphqlKeys(info);
    return this.holidaysService.create(input, keys);
  }

  @Mutation(() => Holiday)
  async updateHoliday(
    @Args('id') id: string,
    @Args('input') input: HolidayInput,
    @Info() info,
  ): Promise<Holiday> {
    const keys = graphqlKeys(info);
    return this.holidaysService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteHoliday(@Args('id') id: string): Promise<boolean> {
    return this.holidaysService.delete(id);
  }
}
