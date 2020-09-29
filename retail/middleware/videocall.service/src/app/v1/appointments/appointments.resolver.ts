import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment, User } from './appointment.model';
import { NewAppointmentInput } from './appointment.dto';
import { CurrentUser, Fields } from '@common/decorators';
import { PLATFORMS } from '@common/constants';
import { ICurrentUser } from '@common/interfaces';

@Resolver(Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ResolveField(() => User)
  async user(@Parent() appointment: Appointment): Promise<User> {
    return await this.appointmentsService.get_user_by_id_from_service(
      appointment.user_id,
    );
  }

  @Mutation(() => Appointment)
  async addAppointment(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('appointment') appointment: NewAppointmentInput,
    @Fields(Appointment) output: string[],
  ): Promise<Appointment> {
    return this.appointmentsService.create(currentUser, appointment, output);
  }

  @Query(() => Appointment)
  async findAppointment(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('appointment_id') appointment_id: string,
    @Fields(Appointment) output: string[],
  ): Promise<Appointment> {
    return this.appointmentsService.findById(
      currentUser,
      appointment_id,
      output,
    );
  }

  @Query(() => Appointment)
  async findAppointmentByUserId(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('user_id') user_id: string,
    @Fields(Appointment) output: string[],
  ): Promise<Appointment> {
    return this.appointmentsService.findByUserId(currentUser, user_id, output);
  }
}
