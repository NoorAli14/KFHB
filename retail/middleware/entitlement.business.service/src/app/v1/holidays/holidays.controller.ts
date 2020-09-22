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
import { AuthGuard } from '@common/index';
import { Holiday } from './holiday.entity';
import { CreateHolidayDto, UpdateHolidayDTO } from './holiday.dto';
import { HolidaysService } from './holidays.service';

@ApiTags('Holidays')
@Controller('holidays')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class HolidaysController {
  constructor(private readonly holidayService: HolidaysService) { }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of holidays information.',
    summary: 'List of all holidays.',
  })
  @ApiOkResponse({
    type: [Holiday],
    description: 'List of all holidays.',
  })
  async list(): Promise<Holiday[]> {
    return this.holidayService.list();
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
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.holidayService.delete(id);
  }
}
