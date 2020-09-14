import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Module } from './module.entity';
import { ModuleDto } from './module.dto';
import { ModuleService } from './modules.service';
import { AuthGuard, Header, IHEADER } from '@common/index';

@ApiTags('Module')
@Controller('modules')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ModulesController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post('/')
  @ApiBody({ description: 'Sets the module properties.', type: ModuleDto })
  @ApiOperation({
    summary: 'Create a new module',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows module information.',
  })
  @ApiCreatedResponse({
    type: Module,
    description: 'Module has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async create(
    @Header() header: IHEADER,
    @Body() moduleDto: ModuleDto,
  ): Promise<Module> {
    return this.moduleService.create(header, moduleDto);
  }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of modules information.',
    summary: 'List of all the modules',
  })
  @ApiOkResponse({ type: [Module], description: 'List of all the modules.' })
  async list(@Header() header: IHEADER): Promise<Module[]> {
    return this.moduleService.list(header);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a module by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows module information.',
  })
  @ApiOkResponse({
    type: Module,
    description: 'Module has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Module Not Found.',
  })
  async findOne(
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Module> {
    const module = await this.moduleService.findOne(header, id);
    if (!module) {
      throw new NotFoundException('Module Not Found');
    }
    return module;
  }

  @Put(':id')
  @ApiBody({ description: 'Sets the module properties.', type: ModuleDto })
  @ApiOperation({
    summary: 'Update a module by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows module information.',
  })
  @ApiOkResponse({
    type: Module,
    description: 'Module has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Module Not Found.',
  })
  async update(
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() moduleOtp: ModuleDto,
  ): Promise<Module> {
    return this.moduleService.update(header, id, moduleOtp);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a Module by ID',
    description:
      'A successful request returns the HTTP 204 No Content status code with empty response body.',
  })
  @ApiNoContentResponse({
    description: 'Module has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Module Not Found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.moduleService.delete(header, id);
  }
}
