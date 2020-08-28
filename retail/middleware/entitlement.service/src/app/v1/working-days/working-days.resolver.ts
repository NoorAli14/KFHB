import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField, Parent,
} from "@nestjs/graphql";
import { KeyValInput } from "@common/inputs/key-val.input";
import { WorkingDay } from "@app/v1/working-days/working-day.model";
import { WorkingDaysService } from "@app/v1/working-days/working-days.service";
import { WorkingDayInput } from "@app/v1/working-days/working-day.dto";
import {Fields} from '@common/decorators';
import {HttpException, HttpStatus} from '@nestjs/common';
import {MESSAGES} from '@common/constants';

@Resolver(WorkingDay)
export class WorkingDaysResolver {
  constructor(private readonly workingDaysService: WorkingDaysService) {}

  @Query(() => [WorkingDay])
  async workingDaysList(@Fields() columns: string[]): Promise<WorkingDay[]> {
    return this.workingDaysService.list(columns);
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
  async addWorkingDay(@Args('input') input: WorkingDayInput, @Fields() columns: string[]): Promise<WorkingDay> {
    return this.workingDaysService.create(input, columns);
  }

  @Mutation(() => WorkingDay)
  async updateWorkingDay(
    @Args('id') id: string,
    @Args('input') input: WorkingDayInput,
    @Fields() columns: string[]
  ): Promise<WorkingDay> {
    const workingDay: WorkingDay = await this.workingDaysService.findById(id,columns);
    if(!workingDay) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return this.workingDaysService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteWorkingDay(@Args('id') id: string): Promise<boolean> {
    const workingDay: WorkingDay = await this.workingDaysService.findById(id,['id']);
    if(!workingDay) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return this.workingDaysService.delete(id);
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
