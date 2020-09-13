import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql, IHEADER } from '@common/index';
import { WorkingDay } from './working-day.entity';
import { WorkingDayDTO } from './working-day.dto';
@Injectable()
export class WorkingDaysService {
  private readonly logger: Logger = new Logger(WorkingDaysService.name);

  private readonly __output: string = `{
    id
    week_day
    start_time
    end_time
    remarks
    full_day
    status
    created_on
    created_on
    updated_on
    updated_by
  }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  async create(header: IHEADER, input: WorkingDayDTO): Promise<WorkingDay> {
    this.logger.log(`Creating a new working day`);

    const mutation: string = `mutation {
      result: addWorkingDay(input: ${toGraphql(input)}) ${this.__output}
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async list(header: IHEADER): Promise<WorkingDay[]> {
    this.logger.log(`Start fetching list of all working days`);

    const query: string = `query {
      result: workingDaysList ${this.__output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async findOne(
    header: IHEADER,
    id: string,
    output?: string,
  ): Promise<WorkingDay> {
    this.logger.log(`Find working day with ID [${id}]`);

    const _output: string = output ? output : this.__output;
    const query: string = `query {
      result: findWorkingDayById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async update(
    header: IHEADER,
    id: string,
    input: WorkingDayDTO,
  ): Promise<WorkingDay> {
    this.logger.log(`Start Updating working day with ID [${id}]`);

    const user: WorkingDay = await this.findOne(header, id, `{id}`);
    if (!user) {
      throw new NotFoundException('Working day not found');
    }
    const mutation: string = `mutation {
      result: updateWorkingDay(id: "${id}", input: ${toGraphql(input)}) ${
      this.__output
    }
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async delete(header: IHEADER, id: string): Promise<boolean> {
    this.logger.log(`Start Deleting working day with ID [${id}]`);

    const workingDay: WorkingDay = await this.findOne(header, id, `{id}`);
    if (!workingDay) {
      throw new NotFoundException('Working day not found');
    }
    const mutation: string = `mutation {
      result: deleteWorkingDay(id: "${id}") 
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }
}
