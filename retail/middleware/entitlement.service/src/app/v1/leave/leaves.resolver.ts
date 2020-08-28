import {
  Resolver,
  Query,
  Mutation,
  Args,
  Info
} from "@nestjs/graphql";
import { graphqlKeys } from "@common/utilities";
import { KeyValInput } from "@common/inputs/key-val.input";
import {Leave} from "@app/v1/leave/leave.model";
import {LeavesService} from "@app/v1/leave/leaves.service";
import {LeaveInput} from "@app/v1/leave/leave.dto";

@Resolver(Leave)
export class LeavesResolver {
  constructor(private readonly leavesService: LeavesService) {}

  @Query(() => [Leave])
  async leavesList(@Info() info): Promise<Leave[]> {
    const keys = graphqlKeys(info);
    return this.leavesService.list(keys);
  }

  @Query(() => Leave)
  async findLeaveById(@Args('id') id: string, @Info() info): Promise<Leave> {
    const keys = graphqlKeys(info);
    return this.leavesService.findById(id, keys);
  }

  @Query(() => [Leave])
  async findLeaveBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Info() info
  ): Promise<Leave[]> {
    const keys = graphqlKeys(info);
    return this.leavesService.findByProperty(checks, keys);
  }

  @Mutation(() => Leave)
  async addLeave(@Args('input') input: LeaveInput, @Info() info): Promise<Leave> {
    const keys = graphqlKeys(info);
    return this.leavesService.create(input, keys);
  }

  @Mutation(() => Leave)
  async updateLeave(
    @Args('id') id: string,
    @Args('input') input: LeaveInput,
    @Info() info
  ): Promise<Leave> {
    const keys = graphqlKeys(info);
    return this.leavesService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteLeave(@Args('id') id: string): Promise<boolean> {
    return this.leavesService.delete(id);
  }
}
