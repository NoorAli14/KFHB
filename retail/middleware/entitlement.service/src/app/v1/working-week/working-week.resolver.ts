import {
  Resolver,
  Query,
  Mutation,
  Args,
  Info,
} from "@nestjs/graphql";
import { graphqlKeys } from "@common/utilities";
import { KeyValInput } from "@common/inputs/key-val-input";
import {WorkingWeekService} from "@app/v1/working-week/working-week.service";
import {WorkingWeek} from "@app/v1/working-week/working-week.model";
import {WorkingWeekInput} from "@app/v1/working-week/working-week.dto";

@Resolver(WorkingWeek)
export class WorkingWeekResolver {
  constructor(private readonly workingWeekService: WorkingWeekService) {}

  @Query(() => [WorkingWeek])
  async workingWeeksList(@Info() info): Promise<WorkingWeek[]> {
    const keys = graphqlKeys(info);
    return this.workingWeekService.list(keys);
  }

  @Query(() => WorkingWeek)
  async findWorkingWeekById(@Args('id') id: string, @Info() info): Promise<WorkingWeek> {
    const keys = graphqlKeys(info);
    return this.workingWeekService.findById(id, keys);
  }

  @Query(() => [WorkingWeek])
  async findWorkingWeekBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Info() info
  ): Promise<WorkingWeek[]> {
    const keys = graphqlKeys(info);
    return this.workingWeekService.findByProperty(checks, keys);
  }

  @Mutation(() => WorkingWeek)
  async addWorkingWeek(@Args('input') input: WorkingWeekInput, @Info() info): Promise<WorkingWeek> {
    const keys = graphqlKeys(info);
    return this.workingWeekService.create(input, keys);
  }

  @Mutation(() => WorkingWeek)
  async updateWorkingWeek(
    @Args('id') id: string,
    @Args('input') input: WorkingWeekInput,
    @Info() info
  ): Promise<WorkingWeek> {
    const keys = graphqlKeys(info);
    return this.workingWeekService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteWorkingWeek(@Args('id') id: string): Promise<boolean> {
    return this.workingWeekService.delete(id);
  }
}
