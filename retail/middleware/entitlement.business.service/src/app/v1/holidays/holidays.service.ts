import { Injectable, Logger } from '@nestjs/common';
import {GqlClientService, PAGINATION_OUTPUT, toGraphql} from '@common/index';
import {Holiday, HolidayPaginationList} from './holiday.entity';
import { CreateHolidayDto, UpdateHolidayDTO } from './holiday.dto';

@Injectable()
export class HolidaysService {
  private readonly logger: Logger = new Logger(HolidaysService.name);

  private readonly __output: string = `{
    id
    holiday_date
    description
    remarks
    status
    created_on
    created_by
    updated_on
    updated_by
  }`;

  constructor(private readonly gqlClient: GqlClientService) { }

  async create(input: CreateHolidayDto): Promise<Holiday> {
    this.logger.log(`Creating a new holiday`);

    const mutation = `mutation {
      result: addHoliday(input: ${toGraphql(input)}) ${this.__output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async list(params?: any): Promise<HolidayPaginationList> {
    this.logger.log(`Start fetching list of all holidays`);
    const query = `query {
      result: holidaysList(
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
    output?: string,
  ): Promise<Holiday> {
    this.logger.log(`Find Holiday with ID [${id}]`);

    const _output: string = output ? output : this.__output;
    const query = `query {
      result: findHolidayById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.send(query);
  }

  async update(
    id: string,
    input: UpdateHolidayDTO,
  ): Promise<Holiday> {
    this.logger.log(`Start Updating Holiday with ID [${id}]`);
    const mutation = `mutation {
      result: updateHoliday(id: "${id}", input: ${toGraphql(input)}) ${this.__output
      }
    }`;
    return this.gqlClient.send(mutation);
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`Start Deleting Holiday with ID [${id}]`);
    const mutation = `mutation {
      result: deleteHoliday(id: "${id}") 
    }`;
    return this.gqlClient.send(mutation);
  }
}
