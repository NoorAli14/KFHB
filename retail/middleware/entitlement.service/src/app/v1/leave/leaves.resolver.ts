import {
  Resolver,
  Query,
  Mutation,
  Args, Context, GraphQLExecutionContext,
} from "@nestjs/graphql";
import { KeyValInput } from "@common/inputs/key-val.input";
import {Leave, LeaveWithPagination} from "@app/v1/leave/leave.model";
import {LeavesService} from "@app/v1/leave/leaves.service";
import {LeaveInput} from "@app/v1/leave/leave.dto";
import {HttpException, HttpStatus} from '@nestjs/common';
import {MESSAGES, STATUS} from '@common/constants';
import {Fields} from '@common/decorators';
import {getMutateProps} from '@common/utilities';

@Resolver(Leave)
export class LeavesResolver {
  constructor(private readonly leavesService: LeavesService) {}

  @Query(() => [Leave])
  async leavesList(@Fields() columns: string[], @Context() context: GraphQLExecutionContext): Promise<Leave[]> {
    return this.leavesService.list(columns, context['req'].query);
  }

  @Query(() => Leave)
  async findLeaveById(@Args('id') id: string, @Fields() columns: string[]): Promise<Leave> {
    const leave: Leave = await this.leavesService.findById(id,columns);
    if(!leave) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return leave;
  }

  @Query(() => [Leave])
  async findLeaveBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Fields() columns: string[]
  ): Promise<Leave[]> {
    return this.leavesService.findByProperty(checks, columns);
  }

  @Mutation(() => Leave)
  async addLeave(@Args('input') input: LeaveInput,
                 @Fields() columns: string[],
                 @Context() context: GraphQLExecutionContext): Promise<Leave> {
    input = getMutateProps('created', context['req'].headers, input);
    return this.leavesService.create(input, columns);
  }

  @Mutation(() => Leave)
  async updateLeave(
    @Args('id') id: string,
    @Args('input') input: LeaveInput,
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext
  ): Promise<Leave> {
    const leave: Leave = await this.leavesService.findById(id,['id']);
    if(!leave) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    input = getMutateProps('updated', context['req'].headers, input);
    return this.leavesService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteLeave(@Args('id') id: string,
                    @Context() context: GraphQLExecutionContext): Promise<boolean> {
    const leave: Leave = await this.leavesService.findById(id,['id']);
    if(!leave) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    let input = {status: STATUS.INACTIVE};
    input = getMutateProps('deleted', context['req'].headers, input);
    return this.leavesService.delete(id, input);
  }
}
