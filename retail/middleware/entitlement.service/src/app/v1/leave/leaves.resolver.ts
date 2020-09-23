import {
  Resolver,
  Query,
  Mutation,
  Args, Context, GraphQLExecutionContext,
} from "@nestjs/graphql";
import { KeyValInput } from "@common/inputs/key-val.input";
import {Leave} from "@app/v1/leave/leave.model";
import {LeavesService} from "@app/v1/leave/leaves.service";
import {LeaveCreateInput, LeaveInput} from "@app/v1/leave/leave.dto";
import {HttpException, HttpStatus} from '@nestjs/common';
import {MESSAGES} from '@common/constants';
import {CurrentUser, Fields} from '@common/decorators';
import {User} from '@app/v1/users/user.model';
import {UserService} from '@app/v1/users/users.service';
import {LeaveTypeService} from '@app/v1/leave_type/leave_type.service';
import {LeaveType} from '@app/v1/leave_type/leave_type.model';
import {ICurrentUser} from '@common/interfaces';
import {LeaveNotFoundException} from '@app/v1/leave/exceptions';
import {LeaveTypeNotFoundException} from '@app/v1/leave_type/exceptions';

@Resolver(Leave)
export class LeavesResolver {
  constructor(private readonly leavesService: LeavesService,
              private readonly userService: UserService,
              private readonly leave_typeService: LeaveTypeService) {}

  @Query(() => [Leave])
  async leavesList(@Fields() columns: string[],
                   @CurrentUser() current_user: ICurrentUser,
                   @Context() context: GraphQLExecutionContext): Promise<Leave[]> {
    return this.leavesService.list(current_user, columns, context['req'].query);
  }

  @Query(() => Leave)
  async findLeaveById(@Args('id') id: string,
                      @CurrentUser() current_user: ICurrentUser,
                      @Fields() columns: string[]): Promise<Leave> {
    const leave: Leave = await this.leavesService.findById(current_user, id,columns);
    if(!leave) throw new LeaveNotFoundException(id);
    return leave;
  }

  @Query(() => [Leave])
  async findLeaveBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Fields() columns: string[],
      @CurrentUser() current_user: ICurrentUser,
  ): Promise<Leave[]> {
    return this.leavesService.findByProperty(current_user, checks, columns);
  }

  @Mutation(() => Leave)
  async addLeave(@Args('input') input: LeaveCreateInput,
                 @Fields() columns: string[],
                 @CurrentUser() current_user: ICurrentUser): Promise<Leave> {
    const user: User = await this.userService.findById(input.user_id,['id']);
    if(!user) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.USER_NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    const leaveType: LeaveType = await this.leave_typeService.findById(current_user, input.leave_type_id,['id']);
    if(!leaveType) throw new LeaveTypeNotFoundException(input.leave_type_id);
    return this.leavesService.create(current_user, input, columns);
  }

  @Mutation(() => Leave)
  async updateLeave(
    @Args('id') id: string,
    @Args('input') input: LeaveInput,
    @Fields() columns: string[],
    @CurrentUser() current_user: ICurrentUser,
  ): Promise<Leave> {
    if(input.user_id) {
      const user: User = await this.userService.findById(input.user_id,['id']);
      if(!user) throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: MESSAGES.USER_NOT_FOUND,
      }, HttpStatus.NOT_FOUND);
    }
    if(input.leave_type_id){
      const leaveType: LeaveType = await this.leave_typeService.findById(current_user, input.leave_type_id,['id']);
      if(!leaveType) throw new LeaveTypeNotFoundException(input.leave_type_id);
    }
    return this.leavesService.update(current_user, id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteLeave(@Args('id') id: string,
                    @CurrentUser() current_user: ICurrentUser): Promise<boolean> {
    const leave: Leave = await this.leavesService.findById(current_user, id,['id']);
    if(!leave) throw new LeaveNotFoundException(id);
    return this.leavesService.delete(current_user, id);
  }
}
