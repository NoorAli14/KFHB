import {Resolver, Query, Mutation, Args, Context, GraphQLExecutionContext} from '@nestjs/graphql';

import { KeyValInput } from '@common/inputs/key-val.input';
import {Holiday, HolidayWithPagination} from '@app/v1/holiday/holiday.model';
import { HolidaysService } from '@app/v1/holiday/holidays.service';
import { HolidayInput } from '@app/v1/holiday/holiday.dto';
import {Fields} from '@common/decorators';
import {HttpException, HttpStatus} from '@nestjs/common';
import {MESSAGES, STATUS} from '@common/constants';
import {getMutateProps} from '@common/utilities';

@Resolver(Holiday)
export class HolidaysResolver {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Query(() => [Holiday])
  async holidaysList(@Fields() columns: string[], @Context() context: GraphQLExecutionContext): Promise<Holiday[]> {
    return this.holidaysService.list(columns, context['req'].query);
  }

  @Query(() => Holiday)
  async findHolidayById(
    @Args('id') id: string,
    @Fields() columns: string[]
  ): Promise<Holiday> {
    const holiday: Holiday = await this.holidaysService.findById(id,columns);
    if(!holiday) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return holiday;
  }

  @Query(() => [Holiday])
  async findHolidayBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Fields() columns: string[]
  ): Promise<Holiday[]> {
    return this.holidaysService.findByProperty(checks, columns);
  }

  @Mutation(() => Holiday)
  async addHoliday(
    @Args('input') input: HolidayInput,
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext
  ): Promise<Holiday> {
    input = getMutateProps('created', context['req'].headers, input);
    return this.holidaysService.create(input, columns);
  }

  @Mutation(() => Holiday)
  async updateHoliday(
    @Args('id') id: string,
    @Args('input') input: HolidayInput,
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext
  ): Promise<Holiday> {
    const holiday: Holiday = await this.holidaysService.findById(id,['id']);
    if(!holiday) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    input = getMutateProps('updated', context['req'].headers, input);
    return this.holidaysService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteHoliday(@Args('id') id: string,
                      @Context() context: GraphQLExecutionContext): Promise<boolean> {
    const holiday: Holiday = await this.holidaysService.findById(id,['id']);
    if(!holiday) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    let input = {status: STATUS.INACTIVE};
    input = getMutateProps('deleted', context['req'].headers, input);
    return this.holidaysService.delete(id, input);
  }
}
