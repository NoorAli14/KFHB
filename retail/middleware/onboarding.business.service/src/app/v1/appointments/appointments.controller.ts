import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@common/index';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDTO } from './appointment.dto';

@ApiTags('Appointment Module')
@Controller('appointments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService) {
    }

    @Post('/')
    @ApiOperation({
        description:
            'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows a appointment information.',
        summary: 'Create appointment.',
    })
    @ApiCreatedResponse({ type: Appointment, description: 'Appointment has been successfully created.' })
    async create(@Body() input: CreateAppointmentDTO): Promise<Appointment> {
        return this.appointmentService.create(input);
    }
}
