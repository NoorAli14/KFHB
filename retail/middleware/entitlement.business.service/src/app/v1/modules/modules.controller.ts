import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
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
} from '@nestjs/swagger';
import { ModuleService } from './modules.service';
import { Role } from './module.entity';
import { RoleDto } from './module.dto';

@ApiTags('Module')
@Controller('modules')
@ApiBearerAuth()
export class ModulesController {
  constructor(private readonly roleService: ModuleService) {}

  @Post('/')
  @ApiBody({ description: 'Sets the module properties.' })
  @ApiOperation({
    summary: 'Create a new module',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows module information.',
  })
  @ApiCreatedResponse({
    type: Role,
    description: 'Module has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async create(@Body() roleDto: Role): Promise<Role> {
    return this.roleService.create(roleDto);
  }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of modules information.',
    summary: 'List of all the modules',
  })
  @ApiOkResponse({ type: [Role], description: 'List of all the modules.' })
  async list(): Promise<Role[]> {
    return this.roleService.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a module by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows module information.',
  })
  @ApiOkResponse({
    type: Role,
    description: 'Module has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ description: 'Sets the module properties.' })
  @ApiOperation({
    summary: 'Update a module by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows module information.',
  })
  @ApiOkResponse({
    type: Role,
    description: 'Module has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async update(@Body() roleDto: Role): Promise<Role> {
    return this.roleService.create(roleDto);
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
  async delete(@Param('id') id: string): Promise<any> {
    this.roleService.delete(id);
  }
}
