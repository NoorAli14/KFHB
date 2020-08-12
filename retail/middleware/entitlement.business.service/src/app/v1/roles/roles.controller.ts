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
import { RoleService } from './roles.service';
import { Role } from './role.entity';
import { RoleDto } from './role.dto';

@ApiTags('Role')
@Controller('roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/')
  @ApiBody({ description: 'Sets the role properties.' })
  @ApiOperation({
    summary: 'Create a new role',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows role information.',
  })
  @ApiCreatedResponse({
    type: Role,
    description: 'Role has been successfully created.',
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
      'A successful request returns the HTTP 20O OK status code and a JSON response body that shows list of roles information.',
    summary: 'List of all the roles',
  })
  @ApiOkResponse({ type: [Role], description: 'List of all the roles.' })
  async list(): Promise<Role[]> {
    return this.roleService.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a role by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows role information.',
  })
  @ApiOkResponse({
    type: Role,
    description: 'Role has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ description: 'Sets the role properties.' })
  @ApiOperation({
    summary: 'Update a role by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows role information.',
  })
  @ApiOkResponse({
    type: Role,
    description: 'Role has been successfully updated.',
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
    summary: 'Delete a role by ID',
    description:
      'A successful request returns the HTTP 204 No Content status code with empty response body.',
  })
  @ApiNoContentResponse({ description: 'Role has been successfully deleted.' })
  async delete(@Param('id') id: string): Promise<any> {
    this.roleService.delete(id);
  }
}
