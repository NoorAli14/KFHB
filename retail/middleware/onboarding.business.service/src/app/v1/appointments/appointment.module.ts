import { Module } from '@nestjs/common';
import { GqlClientModule, GqlClientService } from '@common/index';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';

@Module({
  imports: [GqlClientModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, GqlClientService],
})
export class AppointmentModule { }
