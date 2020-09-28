import {Injectable} from "@nestjs/common";

import { KeyValInput } from "@common/inputs/key-val.input";
import {LeaveRepository} from "@core/repository/leave.repository";
import {ICurrentUser} from '@common/interfaces';
import {LeaveInput} from '@app/v1/leave/leave.dto';
import {Leave} from '@app/v1/leave/leave.model';
import {LeaveNotFoundException, LeaveStartDateLessThanEndDateException} from '@app/v1/leave/exceptions';

@Injectable()
export class LeavesService {
  constructor(private leaveRepository: LeaveRepository) {}

  async list(current_user: ICurrentUser, output: string[], paginationParams: Record<string, any>): Promise<Leave[]> {
    return this.leaveRepository.listWithPagination(paginationParams, output,{deleted_on : null, tenant_id: current_user.tenant_id});
  }

  async findById(current_user: ICurrentUser, id: string, output?: string[]): Promise<Leave> {
    return this.leaveRepository.findOne({ id: id, deleted_on : null, tenant_id: current_user.tenant_id }, output);
  }

  async findByProperty(current_user: ICurrentUser, checks: KeyValInput[], output?: string[]): Promise<Leave[]> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    conditions['tenant_id'] = current_user.tenant_id;
    conditions['deleted_on'] = null;
    return this.leaveRepository.findBy(conditions, output);
  }

  async findByDate(current_user: ICurrentUser, date: string, output: string[]): Promise<Leave[]> {
    const conditions = {};
    conditions['tenant_id'] = current_user.tenant_id;
    conditions['deleted_on'] = null;
    return this.leaveRepository.findByDate(date, conditions, output);
  }

  async update(
    current_user: ICurrentUser,
    id: string,
    input: LeaveInput,
    output?: string[],
  ): Promise<Leave> {
    const leave: Leave = await this.findById(current_user, id,['id', 'start_date', 'end_date']);
    if(!leave) throw new LeaveNotFoundException(id);
    input.start_date = input.start_date || leave.start_date.toISOString();
    input.end_date = input.end_date || leave.end_date.toISOString();
    if (Date.parse(new Date(input.start_date).toISOString()) > Date.parse(new Date(input.end_date).toISOString()))
      throw new LeaveStartDateLessThanEndDateException(id, input.start_date, input.end_date);
    const [result] = await this.leaveRepository.update({ id: id, deleted_on : null, tenant_id: current_user.tenant_id }, {...input, ...{updated_by: current_user.id}}, output);
    return result;
  }

  async create(current_user: ICurrentUser, input: LeaveInput, output?: string[]): Promise<Leave> {
    if (Date.parse(new Date(input.start_date).toISOString()) > Date.parse(new Date(input.end_date).toISOString()))
      throw new LeaveStartDateLessThanEndDateException(null, input.start_date, input.end_date);
    const [result] = await this.leaveRepository.create({
        ...input,
        ...{ tenant_id: current_user.tenant_id, created_by: current_user.id, updated_by: current_user.id}},
      output);
    return result;
  }

  async delete(current_user: ICurrentUser, id: string): Promise<boolean> {
    const result = await this.leaveRepository.markAsDelete(current_user.tenant_id, current_user.id, id);
    return !!result;
  }
}
