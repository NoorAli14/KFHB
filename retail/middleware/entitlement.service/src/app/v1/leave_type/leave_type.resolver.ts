import {Resolver, Query, Mutation, Args, Context, GraphQLExecutionContext} from '@nestjs/graphql';

import { KeyValInput } from '@common/inputs/key-val.input';
import {Fields} from '@common/decorators';
import {HttpException, HttpStatus} from '@nestjs/common';
import {MESSAGES, STATUS} from '@common/constants';
import {getMutateProps} from '@common/utilities';
import {LeaveType, LeaveTypeWithPagination} from '@app/v1/leave_type/leave_type.model';
import {Leave_typeService} from '@app/v1/leave_type/leave_type.service';
import {LeaveTypeCreateInput, LeaveTypeInput} from '@app/v1/leave_type/leave_type.dto';

@Resolver(LeaveType)
export class Leave_typeResolver {
  constructor(private readonly leave_typeService: Leave_typeService) {}

  @Query(() => [LeaveType])
  async leaveTypeList(@Fields() columns: string[], @Context() context: GraphQLExecutionContext): Promise<LeaveType[]> {
    return this.leave_typeService.list(columns, context['req'].query);
  }

  @Query(() => LeaveType)
  async findLeaveTypeById(
    @Args('id') id: string,
    @Fields() columns: string[]
  ): Promise<LeaveType> {
    const leaveType: LeaveType = await this.leave_typeService.findById(id,columns);
    if(!leaveType) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return leaveType;
  }

  @Query(() => [LeaveType])
  async findLeaveTypeBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Fields() columns: string[]
  ): Promise<LeaveType[]> {
    return this.leave_typeService.findByProperty(checks, columns);
  }

  @Mutation(() => LeaveType)
  async addLeaveType(
    @Args('input') input: LeaveTypeCreateInput,
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext
  ): Promise<LeaveType> {
    input = getMutateProps('created', context['req'].headers, input);
    return this.leave_typeService.create(input, columns);
  }

  @Mutation(() => LeaveType)
  async updateLeaveType(
    @Args('id') id: string,
    @Args('input') input: LeaveTypeInput,
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext
  ): Promise<LeaveType> {
    const leaveType: LeaveType = await this.leave_typeService.findById(id,['id']);
    if(!leaveType) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    input = getMutateProps('updated', context['req'].headers, input);
    return this.leave_typeService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteLeaveType(@Args('id') id: string,
                      @Context() context: GraphQLExecutionContext): Promise<boolean> {
    const leaveType: LeaveType = await this.leave_typeService.findById(id,['id']);
    if(!leaveType) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    let input = {status: STATUS.INACTIVE};
    input = getMutateProps('deleted', context['req'].headers, input);
    return this.leave_typeService.delete(id, input);
  }
}
