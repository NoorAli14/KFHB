import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { AuthGuard, PermissionsGuard, Permissions } from '@common/index';
import { WorkingDaysService } from './working-days.service';
import { WorkingDay } from './working-day.entity';
import { WorkingDayDTO } from './working-day.dto';

@ApiTags('Working Days Module')
@Controller('working-days')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
export class WorkingDaysController {
  constructor(private readonly workingDayService: WorkingDaysService) { }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of working days information.',
    summary: 'List of all working days.',
  })
  @ApiOkResponse({
    type: [WorkingDay],
    description: 'List of all working days.',
  })
  @Permissions('view:working-days')
  async list(): Promise<WorkingDay[]> {
    return this.workingDayService.list();
  }

  @Post('/')
  @ApiBody({
    description: 'Sets the working day properties.',
    type: WorkingDayDTO,
  })
  @ApiOperation({
    summary: 'Create a working day',
    description:
      'A successful request returns the HTTP 201 OK status code and a JSON response body that shows working day information.',
  })
  @ApiOkResponse({
    type: WorkingDay,
    description: 'Working day has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @Permissions('create:working-days')
  async create(
    @Body() input: WorkingDayDTO,
  ): Promise<WorkingDay> {
    return this.workingDayService.create(input);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a working day by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows working day information.',
  })
  @ApiOkResponse({
    type: WorkingDay,
    description: 'Working day has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Working day Not Found.',
  })
  @Permissions('view:working-days')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<WorkingDay> {
    return this.workingDayService.findOne(
      id,
    );
  }

  @Put(':id')
  @ApiBody({
    description: 'Sets the working day properties.',
    type: WorkingDayDTO,
  })
  @ApiOperation({
    summary: 'Update a working by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows working day information.',
  })
  @ApiOkResponse({
    type: WorkingDay,
    description: 'Working day has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Working day Not Found.',
  })
  @Permissions('edit:working-days')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: WorkingDayDTO,
  ): Promise<WorkingDay> {
    return this.workingDayService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a working day by ID',
    description:
      'A successful request returns the HTTP 204 No Content status code with empty response body.',
  })
  @ApiNoContentResponse({
    description: 'Working day has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Working day Not Found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('delete:working-days')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.workingDayService.delete(id);
  }
}
