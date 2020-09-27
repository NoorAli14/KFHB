import {Resolver, Query, Mutation, Args, Context, GraphQLExecutionContext} from '@nestjs/graphql';

import { KeyValInput } from '@common/inputs/key-val.input';
import {Holiday} from '@app/v1/holiday/holiday.model';
import { HolidaysService } from '@app/v1/holiday/holidays.service';
import {HolidayCreateInput, HolidayInput} from '@app/v1/holiday/holiday.dto';
import {CurrentUser, Fields} from '@common/decorators';
import {ICurrentUser} from '@common/interfaces';
import {HolidayNotFoundException} from '@app/v1/holiday/exceptions';

@Resolver(Holiday)
export class HolidaysResolver {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Query(() => [Holiday])
  async holidaysList(@Fields() output: string[],
                     @CurrentUser() current_user: ICurrentUser,
                     @Context() context: GraphQLExecutionContext): Promise<Holiday[]> {
    return this.holidaysService.list(current_user, output, context['req'].query);
  }

  @Query(() => Holiday)
  async findHolidayById(
    @Args('id') id: string,
    @CurrentUser() current_user: ICurrentUser,
    @Fields() output: string[]
  ): Promise<Holiday> {
    const holiday: Holiday = await this.holidaysService.findById(current_user, id,output);
    if(!holiday) throw new HolidayNotFoundException(id);
    return holiday;
  }

  @Query(() => [Holiday])
  async findHolidayBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Fields() output: string[],
    @CurrentUser() current_user: ICurrentUser,
  ): Promise<Holiday[]> {
    return this.holidaysService.findByProperty(current_user, checks, output);
  }

  @Mutation(() => Holiday)
  async addHoliday(
    @Args('input') input: HolidayCreateInput,
    @Fields() output: string[],
    @CurrentUser() current_user: ICurrentUser
  ): Promise<Holiday> {
    return this.holidaysService.create(current_user, input, output);
  }

  @Mutation(() => Holiday)
  async updateHoliday(
    @Args('id') id: string,
    @Args('input') input: HolidayInput,
    @Fields() output: string[],
    @CurrentUser() current_user: ICurrentUser
  ): Promise<Holiday> {
    const holiday: Holiday = await this.holidaysService.findById(current_user, id,['id']);
    if(!holiday) throw new HolidayNotFoundException(id);
    return this.holidaysService.update(current_user, id, input, output);
  }

  @Mutation(() => Boolean)
  async deleteHoliday(@Args('id') id: string,
                      @CurrentUser() current_user: ICurrentUser): Promise<boolean> {
    const holiday: Holiday = await this.holidaysService.findById(current_user, id,['id']);
    if(!holiday) throw new HolidayNotFoundException(id);
    return this.holidaysService.delete(current_user, id);
  }
}
