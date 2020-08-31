import { Module } from '@nestjs/common';
import { AppointmentsResolver } from './appointments.resolver';
import { AppointmentsService } from './appointments.service';
import { AppointmentRepository } from '@core/repository';

@Module({
  providers: [AppointmentsResolver, AppointmentsService, AppointmentRepository],
})
export class AppointmentsModule {}
