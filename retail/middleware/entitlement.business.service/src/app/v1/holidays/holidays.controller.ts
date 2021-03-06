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
  Post, Query,
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
import { AuthGuard, PermissionsGuard, Permissions, PaginationDTO, SortByDTO } from '@common/index';
import { Holiday, HolidayPaginationList } from './holiday.entity';
import { CreateHolidayDto, UpdateHolidayDTO } from './holiday.dto';
import { HolidaysService } from './holidays.service';
import { HolidayFilterDto } from "@app/v1/holidays/dtos";

@ApiTags('Holidays')
@Controller('holidays')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
export class HolidaysController {
  constructor(private readonly holidayService: HolidaysService) { }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of holidays information with pagination.',
    summary: 'List of all holidays.',
  })
  @ApiOkResponse({
    type: HolidayPaginationList,
    description: 'List of all holidays.',
  })
  @Permissions('view:holidays')
  async list(@Query() pagination: PaginationDTO, @Query() filters: HolidayFilterDto, @Query() sort_by: SortByDTO): Promise<HolidayPaginationList> {
    return this.holidayService.list({ pagination, filters, sort_by });
  }

  @Post('/')
  @ApiBody({
    description: 'Sets the holiday properties.',
    type: CreateHolidayDto,
  })
  @ApiOperation({
    summary: 'Create a holiday',
    description:
      'A successful request returns the HTTP 201 OK status code and a JSON response body that shows holiday information.',
  })
  @ApiOkResponse({
    type: Holiday,
    description: 'Holiday has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @Permissions('create:holidays')
  async create(
    @Body() input: CreateHolidayDto,
  ): Promise<Holiday> {
    return this.holidayService.create(input);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a holiday by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows holiday information.',
  })
  @ApiOkResponse({
    type: Holiday,
    description: 'Holiday information day has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Holiday Not Found.',
  })
  @Permissions('view:holidays')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Holiday> {
    return this.holidayService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'Sets the holiday properties.',
    type: UpdateHolidayDTO,
  })
  @ApiOperation({
    summary: 'Update a holiday by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows holiday information.',
  })
  @ApiOkResponse({
    type: Holiday,
    description: 'Holiday has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Holiday Not Found.',
  })
  @Permissions('edit:holidays')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateHolidayDTO,
  ): Promise<Holiday> {
    return this.holidayService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a holiday by ID',
    description:
      'A successful request returns the HTTP 204 No Content status code with empty response body.',
  })
  @ApiNoContentResponse({
    description: 'Holiday has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Holiday Not Found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('delete:holidays')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.holidayService.delete(id);
  }
}
