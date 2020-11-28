import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { UserService } from './users.service';
import { AuthGuard, CurrentUser, CUSTOMER_LAST_STEPS, PermissionsGuard } from '@common/index';
import { CustomersService } from '../customers/customers.service';

import { User } from './user.entity';
import { CheckAvailabilityInput } from './user.dto';
import { AppointmentsService } from '../appointments/appointments.service';
import { Appointment } from '../appointments/appointment.entity';
import { CreateAppointmentDTO } from '../appointments/appointment.dto';

@ApiTags('Agent Module')
@Controller('agents')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly appointmentService: AppointmentsService,
    private readonly customerService: CustomersService,
  ) {}

  @Get('/available')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of agents information.',
    summary: 'List of all available agents.',
  })
  @ApiOkResponse({ type: [User], description: 'List of available agents' })
  async availableAgents(@Query() input: CheckAvailabilityInput): Promise<User[]> {
    return this.userService.availableAgents(input);
  }

  @Post('/appointments')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows an appointment information.',
    summary: 'Create appointment.',
  })
  @ApiCreatedResponse({
    type: Appointment,
    description: 'Appointment has been successfully created.',
  })
  async create(@CurrentUser() currentUser: User, @Body() input: CreateAppointmentDTO): Promise<Appointment> {
    input.user_id = currentUser.id;
    const result = await this.appointmentService.create(input);
    if (result) {
      await this.customerService.updateLastStep(
        currentUser.id,
        CUSTOMER_LAST_STEPS.RBX_ONB_STEP_AGENT_VERIFICATION_SCHEDULED,
      );
    }
    return result;
  }
}
