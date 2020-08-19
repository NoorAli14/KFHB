import {
  Resolver,
  Query,
  Mutation,
  Args,
  Info,
} from "@nestjs/graphql";
import { graphqlKeys } from "@common/utilities";
import { KeyValInput } from "@common/inputs/key-val-input";
import { WorkingDay } from "@app/v1/working-days/working-day.model";
import { WorkingDaysService } from "@app/v1/working-days/working-days.service";
import { WorkingDayInput } from "@app/v1/working-days/working-day.dto";

@Resolver(WorkingDay)
export class WorkingDaysResolver {
  constructor(private readonly workingDaysService: WorkingDaysService) {}

  @Query(() => [WorkingDay])
  async workingDaysList(@Info() info): Promise<WorkingDay[]> {
    const keys = graphqlKeys(info);
    return this.workingDaysService.list(keys);
  }

  @Query(() => WorkingDay)
  async findWorkingDayById(@Args('id') id: string, @Info() info): Promise<WorkingDay> {
    const keys = graphqlKeys(info);
    return this.workingDaysService.findById(id, keys);
  }

  @Query(() => [WorkingDay])
  async findWorkingDayBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Info() info
  ): Promise<WorkingDay[]> {
    const keys = graphqlKeys(info);
    return this.workingDaysService.findByProperty(checks, keys);
  }

  @Mutation(() => WorkingDay)
  async addWorkingDay(@Args('input') input: WorkingDayInput, @Info() info): Promise<WorkingDay> {
    const keys = graphqlKeys(info);
    return this.workingDaysService.create(input, keys);
  }

  @Mutation(() => WorkingDay)
  async updateWorkingDay(
    @Args('id') id: string,
    @Args('input') input: WorkingDayInput,
    @Info() info
  ): Promise<WorkingDay> {
    const keys = graphqlKeys(info);
    return this.workingDaysService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteWorkingDay(@Args('id') id: string): Promise<boolean> {
    return this.workingDaysService.delete(id);
  }
}
