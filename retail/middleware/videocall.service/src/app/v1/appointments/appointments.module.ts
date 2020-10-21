import { Module } from '@nestjs/common';
import { AppointmentsResolver } from './appointments.resolver';
import { AppointmentsService } from './appointments.service';
import { AppointmentRepository } from '@core/repository';
import { GqlClientModule } from '@common/libs/gqlclient/gqlclient.module';
import { EmailService } from './email.service';

@Module({
  imports: [GqlClientModule],
  providers: [
    AppointmentsResolver,
    AppointmentsService,
    AppointmentRepository,
    EmailService,
  ],
})
export class AppointmentsModule {}
