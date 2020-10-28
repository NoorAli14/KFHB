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
import {AuthGuard, PermissionsGuard, Permissions, PaginationDTO, SortByDTO} from '@common/index';

import { RoleService } from './roles.service';
import {Role, RolePaginationList} from './role.entity';
import { RoleDto, UpdateRoleDto } from './role.dto';
import {Query} from "@root/node_modules/@nestjs/common";
import {RoleFilterDto} from "@app/v1/roles/dtos";

@ApiTags('Role')
@Controller('roles')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
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
  @Permissions('create:roles')
  async create(
    @Body() input: RoleDto,
  ): Promise<Role> {
    return this.roleService.create(input);
  }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of roles information with pagination.',
    summary: 'List of all the roles',
  })
  @ApiOkResponse({ type: RolePaginationList, description: 'List of all the roles.' })
  @Permissions('view:roles')
  async list(@Query() pagination: PaginationDTO, @Query() filters: RoleFilterDto, @Query() order: SortByDTO): Promise<RolePaginationList> {
    let sort_by = {};
    if (order) {
      sort_by = {
        field: order?.sort_by || 'created_on',
        direction: order?.sort_order || 'desc'
      }
    }
    return this.roleService.list({ pagination, filters, sort_by });
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
  @Permissions('view:roles')
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
  @Permissions('edit:roles')
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
  @Permissions('delete:roles')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.roleService.delete(id);
  }
}
