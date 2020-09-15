import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql, IHEADER } from '@common/index';
import { Leave } from './leave.entity';
import { LeaveDTO } from './leave.dto';

@Injectable()
export class LeavesService {
  private readonly logger: Logger = new Logger(LeavesService.name);

  private readonly __output: string = `{
    id
    user_id
    leave_date
    leave_duration
    leave_type_id
    remarks
    is_repetitive
    status
    created_on
    created_by
    updated_on
    updated_by
  }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  async create(header: IHEADER, input: LeaveDTO): Promise<Leave> {
    this.logger.log(`Creating a new leave`);

    const mutation: string = `mutation {
      result: addLeave(input: ${toGraphql(input)}) ${this.__output}
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async list(header: IHEADER): Promise<Leave[]> {
    this.logger.log(`Start fetching list of all leaves`);

    const query: string = `query {
      result: leavesList ${this.__output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async findOne(
    header: IHEADER,
    id: string,
    output?: string,
  ): Promise<Leave> {
    this.logger.log(`Find leave with ID [${id}]`);

    const _output: string = output ? output : this.__output;
    const query: string = `query {
      result: findLeaveById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async update(
    header: IHEADER,
    id: string,
    input: LeaveDTO,
  ): Promise<Leave> {
    this.logger.log(`Start updating leave with ID [${id}]`);

    const user: Leave = await this.findOne(header, id, `{id}`);
    if (!user) {
      throw new NotFoundException('Leave not found');
    }
    const mutation: string = `mutation {
      result: updateLeave(id: "${id}", input: ${toGraphql(input)}) ${
      this.__output
    }
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async delete(header: IHEADER, id: string): Promise<boolean> {
    this.logger.log(`Start deleting leave with ID [${id}]`);

    const workingDay: Leave = await this.findOne(header, id, `{id}`);
    if (!workingDay) {
      throw new NotFoundException('Leave not found');
    }
    const mutation: string = `mutation {
      result: deleteLeave(id: "${id}") 
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }
}
