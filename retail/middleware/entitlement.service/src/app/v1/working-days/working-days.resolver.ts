import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context, GraphQLExecutionContext,
} from "@nestjs/graphql";
import { KeyValInput } from "@common/inputs/key-val.input";
import {WorkingDay} from "@app/v1/working-days/working-day.model";
import { WorkingDaysService } from "@app/v1/working-days/working-days.service";
import {WorkingDayCreateInput, WorkingDayInput} from "@app/v1/working-days/working-day.dto";
import {CurrentUser, Fields} from '@common/decorators';
import {ICurrentUser} from '@common/interfaces';
import {WorkingDayNotFoundException} from '@app/v1/working-days/exceptions';

@Resolver(WorkingDay)
export class WorkingDaysResolver {
  constructor(private readonly workingDaysService: WorkingDaysService) {}

  @Query(() => [WorkingDay])
  async workingDaysList(@Fields() output: string[],
                        @CurrentUser() current_user: ICurrentUser): Promise<WorkingDay[]> {
    return this.workingDaysService.list(current_user, output);
  }

  @Query(() => WorkingDay)
  async findWorkingDayById(@Args('id') id: string,
                           @Fields() output: string[],
                           @CurrentUser() current_user: ICurrentUser): Promise<WorkingDay> {
    const workingDay: WorkingDay = await this.workingDaysService.findById(current_user, id,output);
    if(!workingDay) throw new WorkingDayNotFoundException(id);
    return workingDay;
  }

  @Query(() => [WorkingDay])
  async findWorkingDayBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Fields() output: string[],
      @CurrentUser() current_user: ICurrentUser
  ): Promise<WorkingDay[]> {
    return this.workingDaysService.findByProperty(current_user, checks, output);
  }

  @Mutation(() => WorkingDay)
  async addWorkingDay(@Args('input') input: WorkingDayCreateInput,
                      @Fields() output: string[],
                      @CurrentUser() current_user: ICurrentUser): Promise<WorkingDay> {
    return this.workingDaysService.create(current_user, input, output);
  }

  @Mutation(() => WorkingDay)
  async updateWorkingDay(
    @Args('id') id: string,
    @Args('input') input: WorkingDayInput,
    @Fields() output: string[],
    @CurrentUser() current_user: ICurrentUser
  ): Promise<WorkingDay> {
    const workingDay: WorkingDay = await this.workingDaysService.findById(current_user, id, output);
    if(!workingDay) throw new WorkingDayNotFoundException(id);
    return this.workingDaysService.update(current_user, id, input, output);
  }

  @Mutation(() => Boolean)
  async deleteWorkingDay(@Args('id') id: string,
                         @CurrentUser() current_user: ICurrentUser): Promise<boolean> {
    const workingDay: WorkingDay = await this.workingDaysService.findById(current_user, id,['id']);
    if(!workingDay) throw new WorkingDayNotFoundException(id);
    return this.workingDaysService.delete(current_user, id);
  }
}
