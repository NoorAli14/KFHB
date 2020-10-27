import {
  Resolver,
  Query,
  Mutation,
  Args
} from "@nestjs/graphql";
import { KeyValInput } from "@common/inputs/key-val.input";
import {Leave, LeavesWithPagination} from "@app/v1/leave/leave.model";
import {LeavesService} from "@app/v1/leave/leaves.service";
import {LeaveCreateInput, LeaveInput} from "@app/v1/leave/leave.dto";
import {CurrentUser, Fields} from '@common/decorators';
import {User} from '@app/v1/users/user.model';
import {UserService} from '@app/v1/users/users.service';
import {LeaveTypeService} from '@app/v1/leave_type/leave_type.service';
import {LeaveType} from '@app/v1/leave_type/leave_type.model';
import {ICurrentUser} from '@common/interfaces';
import {LeaveNotFoundException} from '@app/v1/leave/exceptions';
import {LeaveTypeNotFoundException} from '@app/v1/leave_type/exceptions';
import { UserNotFoundException } from "../users/exceptions";
import {PaginationParams, SortingParam} from "@common/classes";
import {LeavesFilterParams} from "@app/v1/leave/classes";

@Resolver(Leave)
export class LeavesResolver {
  constructor(private readonly leavesService: LeavesService,
              private readonly userService: UserService,
              private readonly leave_typeService: LeaveTypeService) {}

  @Query(() => LeavesWithPagination)
  async leavesList(
      @Fields() output: string[],
      @Args('pagination', {nullable: true}) paginationParams: PaginationParams,
      @Args('filters', {nullable: true}) filteringParams: LeavesFilterParams,
      @Args('sort_by', {nullable: true}) sortingParams: SortingParam,
      @CurrentUser() currentUser: ICurrentUser
  ): Promise<LeavesWithPagination> {
    return this.leavesService.list(currentUser, paginationParams, filteringParams, sortingParams, output);
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
    const user: User = await this.userService.findById(current_user, input.user_id,['id']);
    if(!user) throw new UserNotFoundException(current_user.id);
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
      const user: User = await this.userService.findById(current_user, input.user_id, ['id']);
      if(!user) throw new UserNotFoundException(current_user.id);
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
