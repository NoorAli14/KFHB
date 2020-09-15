import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql, IHEADER } from '@common/index';
import { LeaveType } from './leave-type.entity';
import { LeaveTypeDTO } from './leave-type.dto';

@Injectable()
export class LeaveTypesService {
  private readonly logger: Logger = new Logger(LeaveTypesService.name);

  private readonly __output: string = `{
    id
    leave_type
    status
    created_by
    created_on
    updated_by
    updated_on
  }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  async create(header: IHEADER, input: LeaveTypeDTO): Promise<LeaveType> {
    this.logger.log(`Creating a new leave type`);

    const mutation: string = `mutation {
      result: addLeaveType(input: ${toGraphql(input)}) ${this.__output}
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async list(header: IHEADER): Promise<LeaveType[]> {
    this.logger.log(`Start fetching list of all leave types`);

    const query: string = `query {
      result: leaveTypeList ${this.__output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async findOne(
    header: IHEADER,
    id: string,
    output?: string,
  ): Promise<LeaveType> {
    this.logger.log(`Find leave type with ID [${id}]`);

    const _output: string = output ? output : this.__output;
    const query: string = `query {
      result: findLeaveTypeById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async update(
    header: IHEADER,
    id: string,
    input: LeaveTypeDTO,
  ): Promise<LeaveType> {
    this.logger.log(`Start updating leave type with ID [${id}]`);

    const leaveType: LeaveType = await this.findOne(header, id, `{id}`);
    if (!leaveType) {
      throw new NotFoundException('Leave type not found');
    }
    const mutation: string = `mutation {
      result: updateLeaveType(id: "${id}", input: ${toGraphql(input)}) ${
      this.__output
    }
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async delete(header: IHEADER, id: string): Promise<boolean> {
    this.logger.log(`Start deleting leave type with ID [${id}]`);

    const leaveType: LeaveType = await this.findOne(header, id, `{id}`);
    if (!leaveType) {
      throw new NotFoundException('Leave type not found');
    }
    const mutation: string = `mutation {
      result: deleteLeaveType(id: "${id}") 
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }
}
