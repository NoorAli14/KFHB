import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField, Parent, Context, GraphQLExecutionContext,
} from "@nestjs/graphql";
import { KeyValInput } from "@common/inputs/key-val.input";
import {WorkingDay, WorkingDayWithPagination} from "@app/v1/working-days/working-day.model";
import { WorkingDaysService } from "@app/v1/working-days/working-days.service";
import { WorkingDayInput } from "@app/v1/working-days/working-day.dto";
import {Fields} from '@common/decorators';
import {HttpException, HttpStatus} from '@nestjs/common';
import {MESSAGES, STATUS} from '@common/constants';
import {getMutateProps} from '@common/utilities';

@Resolver(WorkingDay)
export class WorkingDaysResolver {
  constructor(private readonly workingDaysService: WorkingDaysService) {}

  @Query(() => [WorkingDay])
  async workingDaysList(@Fields() columns: string[], @Context() context: GraphQLExecutionContext): Promise<WorkingDay[]> {
    return this.workingDaysService.list(columns, context['req'].query);
  }

  @Query(() => WorkingDay)
  async findWorkingDayById(@Args('id') id: string, @Fields() columns: string[]): Promise<WorkingDay> {
    const workingDay: WorkingDay = await this.workingDaysService.findById(id,columns);
    if(!workingDay) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return workingDay;
  }

  @Query(() => [WorkingDay])
  async findWorkingDayBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Fields() columns: string[]
  ): Promise<WorkingDay[]> {
    return this.workingDaysService.findByProperty(checks, columns);
  }

  @Mutation(() => WorkingDay)
  async addWorkingDay(@Args('input') input: WorkingDayInput,
                      @Fields() columns: string[],
                      @Context() context: GraphQLExecutionContext): Promise<WorkingDay> {
    input = getMutateProps('created', context['req'].headers, input);
    return this.workingDaysService.create(input, columns);
  }

  @Mutation(() => WorkingDay)
  async updateWorkingDay(
    @Args('id') id: string,
    @Args('input') input: WorkingDayInput,
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext
  ): Promise<WorkingDay> {
    const workingDay: WorkingDay = await this.workingDaysService.findById(id,columns);
    if(!workingDay) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    input = getMutateProps('updated', context['req'].headers, input);
    return this.workingDaysService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteWorkingDay(@Args('id') id: string,
                         @Context() context: GraphQLExecutionContext): Promise<boolean> {
    const workingDay: WorkingDay = await this.workingDaysService.findById(id,['id']);
    if(!workingDay) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    let input = {status: STATUS.INACTIVE};
    input = getMutateProps('deleted', context['req'].headers, input);
    return this.workingDaysService.delete(id, input);
  }

  @ResolveField('start_time', returns => String)
  async getStartTime(@Parent() workingDay: WorkingDay) {
    return new Date(workingDay.start_time).toISOString()
  }

  @ResolveField('end_time', returns => String)
  async getEndTime(@Parent() workingDay: WorkingDay) {
    return new Date(workingDay.end_time).toISOString()
  }
}
