import {Resolver, Query, Mutation, Args, Context, GraphQLExecutionContext} from '@nestjs/graphql';

import { KeyValInput } from '@common/inputs/key-val.input';
import {CurrentUser, Fields} from '@common/decorators';
import {LeaveType} from '@app/v1/leave_type/leave_type.model';
import {Leave_typeService} from '@app/v1/leave_type/leave_type.service';
import {LeaveTypeCreateInput, LeaveTypeInput} from '@app/v1/leave_type/leave_type.dto';
import {ICurrentUser} from '@common/interfaces';
import {LeaveTypeNotFoundException} from '@app/v1/leave_type/exceptions';

@Resolver(LeaveType)
export class Leave_typeResolver {
  constructor(private readonly leave_typeService: Leave_typeService) {}

  @Query(() => [LeaveType])
  async leaveTypeList(@Fields() output: string[],
                      @CurrentUser() current_user: ICurrentUser,
                      @Context() context: GraphQLExecutionContext): Promise<LeaveType[]> {
    return this.leave_typeService.list(current_user, output, context['req'].query);
  }

  @Query(() => LeaveType)
  async findLeaveTypeById(
    @Args('id') id: string,
    @CurrentUser() current_user: ICurrentUser,
    @Fields() output: string[]
  ): Promise<LeaveType> {
    const leaveType: LeaveType = await this.leave_typeService.findById(current_user, id, output);
    if(!leaveType) throw new LeaveTypeNotFoundException(id);
    return leaveType;
  }

  @Query(() => [LeaveType])
  async findLeaveTypeBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @CurrentUser() current_user: ICurrentUser,
    @Fields() output: string[]
  ): Promise<LeaveType[]> {
    return this.leave_typeService.findByProperty(current_user, checks, output);
  }

  @Mutation(() => LeaveType)
  async addLeaveType(
    @Args('input') input: LeaveTypeCreateInput,
    @Fields() output: string[],
    @CurrentUser() current_user: ICurrentUser,
  ): Promise<LeaveType> {
    return this.leave_typeService.create(current_user, input, output);
  }

  @Mutation(() => LeaveType)
  async updateLeaveType(
    @Args('id') id: string,
    @Args('input') input: LeaveTypeInput,
    @Fields() output: string[],
    @CurrentUser() current_user: ICurrentUser,
  ): Promise<LeaveType> {
    const leaveType: LeaveType = await this.leave_typeService.findById(current_user, id,['id']);
    if(!leaveType) throw new LeaveTypeNotFoundException(id);
    return this.leave_typeService.update(current_user, id, input, output);
  }

  @Mutation(() => Boolean)
  async deleteLeaveType(@Args('id') id: string,
                        @CurrentUser() current_user: ICurrentUser): Promise<boolean> {
    const leaveType: LeaveType = await this.leave_typeService.findById(current_user, id, ['id']);
    if(!leaveType) throw new LeaveTypeNotFoundException(id);
    return this.leave_typeService.delete(current_user, id);
  }
}
