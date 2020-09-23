import { Injectable } from '@nestjs/common';

import { KeyValInput } from '@common/inputs/key-val.input';
import {LeaveTypeRepository} from '@core/repository/leave_type.repository';
import {ICurrentUser} from '@common/interfaces';
import {LeaveTypeInput} from '@app/v1/leave_type/leave_type.dto';
import {LeaveType} from '@app/v1/leave_type/leave_type.model';
import {LeaveTypeAlreadyExistException} from '@app/v1/leave_type/exceptions';

@Injectable()
export class Leave_typeService {
  constructor(private leaveTypeRepository: LeaveTypeRepository) {}

  async list(current_user: ICurrentUser, output: string[], paginationParams: Record<string, any>): Promise<LeaveType[]> {
    return this.leaveTypeRepository.listWithPagination(paginationParams, output, {deleted_on : null, tenant_id: current_user.tenant_id});
  }

  async findById(current_user: ICurrentUser, id: string, output?: string[]): Promise<LeaveType> {
    return this.leaveTypeRepository.findOne({ id: id, deleted_on : null, tenant_id: current_user.tenant_id}, output);
  }

  async findByProperty(current_user: ICurrentUser, checks: KeyValInput[], output?: string[]): Promise<LeaveType[]> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    conditions['tenant_id'] = current_user.tenant_id;
    conditions['deleted_on'] = null;
    return this.leaveTypeRepository.findBy(conditions, output);
  }

  async update(
    current_user: ICurrentUser,
    id: string,
    input: LeaveTypeInput,
    output?: string[],
  ): Promise<LeaveType> {
    if (input.name) {
      const [leaveType] = await this.findByLeaveType(current_user, input.name);
      if (leaveType && leaveType.id != id) throw new LeaveTypeAlreadyExistException(leaveType[0].id);
    }
    const [result] = await this.leaveTypeRepository.update(
      { id: id, deleted_on : null, tenant_id: current_user.tenant_id},
      {...input, ...{updated_by: current_user.id}}, output);
    return result;
  }

  async create(current_user: ICurrentUser, input: LeaveTypeInput, output?: string[]): Promise<LeaveType> {
    const [leaveType] = await this.findByLeaveType(current_user, input.name);
    if (leaveType) throw new LeaveTypeAlreadyExistException(leaveType.id);
    const [result] = await this.leaveTypeRepository.create(
      {...input, ...{tenant_id: current_user.tenant_id, created_by: current_user.id, updated_by: current_user.id}}, output);
    return result;
  }

  async delete(current_user: ICurrentUser, id: string): Promise<boolean> {
    const result = await this.leaveTypeRepository.markAsDelete(current_user.tenant_id, current_user.id, id);
    return !!result;
  }

  async findByLeaveType(current_user: ICurrentUser, leave_type: string): Promise<LeaveType[]> {
    const checks: KeyValInput[] = [
      {
        record_key: "name",
        record_value: leave_type
      }
    ];
    return this.findByProperty(current_user, checks, ['id', 'name']);
  }
}
