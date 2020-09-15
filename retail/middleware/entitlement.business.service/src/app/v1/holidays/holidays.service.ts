import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql, IHEADER } from '@common/index';
import { Holiday } from './holiday.entity';
import { HolidayDTO } from './holiday.dto';

@Injectable()
export class HolidaysService {
  private readonly logger: Logger = new Logger(HolidaysService.name);

  private readonly __output: string = `{
    id
    holiday_date
    holiday_description
    remarks
    status
    created_on
    created_by
    updated_on
    updated_by
  }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  async create(header: IHEADER, input: HolidayDTO): Promise<Holiday> {
    this.logger.log(`Creating a new holiday`);

    const mutation: string = `mutation {
      result: addHoliday(input: ${toGraphql(input)}) ${this.__output}
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async list(header: IHEADER): Promise<Holiday[]> {
    this.logger.log(`Start fetching list of all holidays`);

    const query: string = `query {
      result: holidaysList ${this.__output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async findOne(
    header: IHEADER,
    id: string,
    output?: string,
  ): Promise<Holiday> {
    this.logger.log(`Find Holiday with ID [${id}]`);

    const _output: string = output ? output : this.__output;
    const query: string = `query {
      result: findHolidayById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async update(
    header: IHEADER,
    id: string,
    input: HolidayDTO,
  ): Promise<Holiday> {
    this.logger.log(`Start Updating Holiday with ID [${id}]`);

    const user: Holiday = await this.findOne(header, id, `{id}`);
    if (!user) {
      throw new NotFoundException('Holiday not found');
    }
    const mutation: string = `mutation {
      result: updateHoliday(id: "${id}", input: ${toGraphql(input)}) ${
      this.__output
    }
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async delete(header: IHEADER, id: string): Promise<boolean> {
    this.logger.log(`Start Deleting Holiday with ID [${id}]`);

    const workingDay: Holiday = await this.findOne(header, id, `{id}`);
    if (!workingDay) {
      throw new NotFoundException('Holiday not found');
    }
    const mutation: string = `mutation {
      result: deleteHoliday(id: "${id}") 
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }
}
