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
import { Holiday } from './holiday.entity';
import { HolidayDTO } from './holiday.dto';
import { HolidaysService } from './holidays.service';

@ApiTags('Holidays')
@Controller('holidays')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class HolidaysController {
  constructor(private readonly holidayService: HolidaysService) {}

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
  async list(@Header() header: IHEADER): Promise<Holiday[]> {
    return this.holidayService.list(header);
  }

  @Post('/')
  @ApiBody({
    description: 'Sets the holiday properties.',
    type: HolidayDTO,
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
    @Header() header: IHEADER,
    @Body() input: HolidayDTO,
  ): Promise<Holiday> {
    return this.holidayService.create(header, input);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a holiday by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows holiday information.',
  })
  @ApiOkResponse({
    type: Holiday,
    description: 'Working day has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Working day Not Found.',
  })
  async findOne(
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Holiday> {
    const working: Holiday = await this.holidayService.findOne(
      header,
      id,
    );
    if (!working) {
      throw new NotFoundException('Holiday not found');
    }
    return working;
  }

  @Put(':id')
  @ApiBody({
    description: 'Sets the holiday properties.',
    type: HolidayDTO,
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
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: HolidayDTO,
  ): Promise<Holiday> {
    return this.holidayService.update(header, id, input);
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
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.holidayService.delete(header, id);
  }
}
