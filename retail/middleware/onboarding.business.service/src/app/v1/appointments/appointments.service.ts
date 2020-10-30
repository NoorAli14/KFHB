import { Injectable, Logger } from '@nestjs/common';
import { GqlClientService, toGraphql } from '@common/index';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDTO } from './appointment.dto';

@Injectable()
export class AppointmentsService {
  private readonly logger: Logger = new Logger(AppointmentsService.name);
  private readonly output: string = `{
    id
    call_time
    gender
    status
    created_on
    updated_on
  }`;

  constructor(private readonly gqlClient: GqlClientService) {}

  async create(input: CreateAppointmentDTO): Promise<Appointment> {
    this.logger.log(`Appointment:: Start creating the appointment at [${input.call_time}]`);
    const mutation = `mutation {
      result: addAppointment(appointment: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }
}
