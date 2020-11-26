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
import { AuthGuard, PaginationDTO, SortByDTO } from '@common/index';
import { Leave, LeavePaginationList } from './leave.entity';
import { CreateLeaveDto, UpdateLeaveDto } from './leave.dto';
import { LeavesService } from './leaves.service';
import { Query } from "@nestjs/common";
import { LeaveFilterDto } from "@app/v1/leaves/dtos";

@ApiTags('Leave Module')
@Controller('leaves')
@ApiBearerAuth()
@UseGuards(AuthGuard)

export class LeavesController {
  constructor(private readonly leaveService: LeavesService) { }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of leaves information with pagination.',
    summary: 'List of all leaves.',
  })
  @ApiOkResponse({
    type: LeavePaginationList,
    description: 'List of all leaves.',
  })
  async list(@Query() pagination: PaginationDTO, @Query() filters: LeaveFilterDto, @Query() sort_by: SortByDTO): Promise<LeavePaginationList> {
    return this.leaveService.list({ pagination, filters, sort_by });
  }

  @Post('/')
  @ApiBody({
    description: 'Sets the leave properties.',
    type: CreateLeaveDto,
  })
  @ApiOperation({
    summary: 'Create a leave',
    description:
      'A successful request returns the HTTP 201 OK status code and a JSON response body that shows leave information.',
  })
  @ApiOkResponse({
    type: Leave,
    description: 'Leave has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async create(
    @Body() input: CreateLeaveDto,
  ): Promise<Leave> {
    return this.leaveService.create(input);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a leave by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows leave information.',
  })
  @ApiOkResponse({
    type: Leave,
    description: 'Leave information has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Leave Not Found.',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Leave> {
    return this.leaveService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'Sets the leave properties.',
    type: UpdateLeaveDto,
  })
  @ApiOperation({
    summary: 'Update a leave by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows leave information.',
  })
  @ApiOkResponse({
    type: Leave,
    description: 'Leave Information has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Leave Not Found.',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateLeaveDto,
  ): Promise<Leave> {
    return this.leaveService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a leave by ID',
    description:
      'A successful request returns the HTTP 204 No Content status code with empty response body.',
  })
  @ApiNoContentResponse({
    description: 'Leave has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Leave Not Found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.leaveService.delete(id);
  }
}
