import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  UseGuards,
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
import { AuthGuard } from '@common/index';

import { RoleService } from './roles.service';
import { Role } from './role.entity';
import { RoleDto, UpdateRoleDto } from './role.dto';

@ApiTags('Role')
@Controller('roles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private readonly roleService: RoleService) { }

  @Post('/')
  @ApiBody({ description: 'Sets the role properties.', type: RoleDto })
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
  async create(
    @Body() input: RoleDto,
  ): Promise<Role> {
    return this.roleService.create(input);
  }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of roles information.',
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
  @ApiNotFoundResponse({
    type: Error,
    description: 'Role Not Found.',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ description: 'Sets the role properties.', type: UpdateRoleDto })
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
  @ApiNotFoundResponse({
    type: Error,
    description: 'Role Not Found.',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() roleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(id, roleDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a role by ID',
    description:
      'A successful request returns the HTTP 204 No Content status code with empty response body.',
  })
  @ApiNoContentResponse({ description: 'Role has been successfully deleted.' })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Role Not Found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.roleService.delete(id);
  }
}
