import { Injectable, Logger } from '@nestjs/common';
import {GqlClientService, PAGINATION_OUTPUT, toGraphql} from '@common/index';
import {Leave, LeavePaginationList} from './leave.entity';
import { CreateLeaveDto, UpdateLeaveDto } from './leave.dto';
import {HolidayPaginationList} from "@app/v1/holidays/holiday.entity";

@Injectable()
export class LeavesService {
  private readonly logger: Logger = new Logger(LeavesService.name);

  private readonly __output: string = `{
    id
    user_id
    leave_type_id
    start_date
    end_date
    remarks
    status
    created_on
    created_by
    updated_on
    updated_by
  }`;

  constructor(private readonly gqlClient: GqlClientService) { }

  async create(input: CreateLeaveDto): Promise<Leave> {
    this.logger.log(`Creating a new leave`);

    const mutation = `mutation {
      result: addLeave(input: ${toGraphql(input)}) ${this.__output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async list(params?: any): Promise<LeavePaginationList> {
    this.logger.log(`Start fetching list of all Leaves`);
    const query = `query {
      result: leavesList(
        filters: ${toGraphql(params?.filters)},
        sort_by: ${toGraphql(params?.sort_by)},
        pagination: ${toGraphql(params?.pagination)}
      ) {
        pagination ${PAGINATION_OUTPUT}
        data ${this.__output}
      }
    }`;
    return this.gqlClient.send(query);
  }

  async findOne(
    id: string,
  ): Promise<Leave> {
    this.logger.log(`Find leave with ID [${id}]`);
    const query = `query {
      result: findLeaveById(id: "${id}") ${this.__output}
    }`;
    return this.gqlClient.send(query);
  }

  async update(
    id: string,
    input: UpdateLeaveDto,
  ): Promise<Leave> {
    this.logger.log(`Start updating leave with ID [${id}]`);
    const mutation = `mutation {
      result: updateLeave(id: "${id}", input: ${toGraphql(input)}) ${this.__output
      }
    }`;
    return this.gqlClient.send(mutation);
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`Start deleting leave with ID [${id}]`);
    const mutation = `mutation {
      result: deleteLeave(id: "${id}") 
    }`;
    return this.gqlClient.send(mutation);
  }
}
