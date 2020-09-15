import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
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
import { AuthGuard, Header, IHEADER } from '@common/index';
import { LeaveType } from './leave-type.entity';
import { LeaveTypeDTO } from './leave-type.dto';
import { LeaveTypesService } from './leave-types.service';

@ApiTags('Leave Types')
@Controller('leave-types')
@ApiBearerAuth()
@UseGuards(AuthGuard)

export class LeaveTypesController {
  constructor(private readonly leaveService: LeaveTypesService) {}

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of leave types information.',
    summary: 'List of all leave types.',
  })
  @ApiOkResponse({
    type: [LeaveType],
    description: 'List of all leaves.',
  })
  async list(@Header() header: IHEADER): Promise<LeaveType[]> {
    return this.leaveService.list(header);
  }

  @Post('/')
  @ApiBody({
    description: 'Sets the leave type properties.',
    type: LeaveTypeDTO,
  })
  @ApiOperation({
    summary: 'Create a leave type',
    description:
      'A successful request returns the HTTP 201 OK status code and a JSON response body that shows leave type information.',
  })
  @ApiOkResponse({
    type: LeaveType,
    description: 'Leave type has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async create(
    @Header() header: IHEADER,
    @Body() input: LeaveTypeDTO,
  ): Promise<LeaveType> {
    return this.leaveService.create(header, input);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a leave type by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows leave type information.',
  })
  @ApiOkResponse({
    type: LeaveType,
    description: 'Leave type infomation has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Leave type Not Found.',
  })
  async findOne(
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<LeaveType> {
    const leave: LeaveType = await this.leaveService.findOne(
      header,
      id,
    );
    if (!leave) {
      throw new NotFoundException('Leave type not found');
    }
    return leave;
  }

  @Put(':id')
  @ApiBody({
    description: 'Sets the leave type properties.',
    type: LeaveTypeDTO,
  })
  @ApiOperation({
    summary: 'Update a leave type by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows leave type information.',
  })
  @ApiOkResponse({
    type: LeaveType,
    description: 'Leave type Information has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Leave type Not Found.',
  })
  async update(
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: LeaveTypeDTO,
  ): Promise<LeaveType> {
    return this.leaveService.update(header, id, input);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a leave type by ID',
    description:
      'A successful request returns the HTTP 204 No Content status code with empty response body.',
  })
  @ApiNoContentResponse({
    description: 'Leave type has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Leave type Not Found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.leaveService.delete(header, id);
  }
}
