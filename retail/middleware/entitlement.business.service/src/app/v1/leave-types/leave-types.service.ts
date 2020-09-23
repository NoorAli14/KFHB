import { Injectable, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql } from '@common/index';
import { LeaveType } from './leave-type.entity';
import { LeaveTypeDTO } from './leave-type.dto';

@Injectable()
export class LeaveTypesService {
  private readonly logger: Logger = new Logger(LeaveTypesService.name);

  private readonly __output: string = `{
    id
    name
    status
    created_by
    created_on
    updated_by
    updated_on
  }`;

  constructor(private readonly gqlClient: GqlClientService) { }

  async create(input: LeaveTypeDTO): Promise<LeaveType> {
    this.logger.log(`Creating a new leave type`);

    const mutation = `mutation {
      result: addLeaveType(input: ${toGraphql(input)}) ${this.__output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async list(): Promise<LeaveType[]> {
    this.logger.log(`Start fetching list of all leave types`);

    const query = `query {
      result: leaveTypeList ${this.__output}
    }`;
    return this.gqlClient.send(query);
  }

  async findOne(
    id: string,
  ): Promise<LeaveType> {
    this.logger.log(`Find leave type with ID [${id}]`);

    const query = `query {
      result: findLeaveTypeById(id: "${id}") ${this.__output}
    }`;
    return this.gqlClient.send(query);
  }

  async update(
    id: string,
    input: LeaveTypeDTO,
  ): Promise<LeaveType> {
    this.logger.log(`Start updating leave type with ID [${id}]`);
    const mutation = `mutation {
      result: updateLeaveType(id: "${id}", input: ${toGraphql(input)}) ${this.__output
      }
    }`;
    return this.gqlClient.send(mutation);
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`Start deleting leave type with ID [${id}]`);
    const mutation = `mutation {
      result: deleteLeaveType(id: "${id}") 
    }`;
    return this.gqlClient.send(mutation);
  }
}
