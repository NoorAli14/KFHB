import { Injectable, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql } from '@common/index';
import { WorkingDay } from './working-day.entity';
import { WorkingDayDTO } from './working-day.dto';
@Injectable()
export class WorkingDaysService {
  private readonly logger: Logger = new Logger(WorkingDaysService.name);

  private readonly __output: string = `{
    id
    week_day
    start_time_local
    end_time_local
    full_day
    remarks
    status
    created_on
    created_by
    updated_on
    updated_by
  }`;

  constructor(private readonly gqlClient: GqlClientService) { }

  async create(input: WorkingDayDTO): Promise<WorkingDay> {
    this.logger.log(`Creating a new working day`);

    const mutation: string = `mutation {
      result: addWorkingDay(input: ${toGraphql(input)}) ${this.__output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async list(): Promise<WorkingDay[]> {
    this.logger.log(`Start fetching list of all working days`);

    const query: string = `query {
      result: workingDaysList ${this.__output}
    }`;
    return this.gqlClient.send(query);
  }

  async findOne(
    id: string,
    output?: string,
  ): Promise<WorkingDay> {
    this.logger.log(`Find working day with ID [${id}]`);

    const _output: string = output ? output : this.__output;
    const query: string = `query {
      result: findWorkingDayById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.send(query);
  }

  async update(
    id: string,
    input: WorkingDayDTO,
  ): Promise<WorkingDay> {
    this.logger.log(`Start Updating working day with ID [${id}]`);
    const mutation: string = `mutation {
      result: updateWorkingDay(id: "${id}", input: ${toGraphql(input)}) ${this.__output
      }
    }`;
    return this.gqlClient.send(mutation);
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`Start Deleting working day with ID [${id}]`);

    const mutation: string = `mutation {
      result: deleteWorkingDay(id: "${id}") 
    }`;
    return this.gqlClient.send(mutation);
  }
}
