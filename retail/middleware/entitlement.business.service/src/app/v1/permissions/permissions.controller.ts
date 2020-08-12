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
import { PermissionService } from './permissions.service';
import { Role } from './permission.entity';
import { RoleDto } from './permission.dto';

@ApiTags('Permission')
@Controller('permissions')
@ApiBearerAuth()
export class PermissionsController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('/')
  @ApiBody({ description: 'Sets the permission properties.' })
  @ApiOperation({
    summary: 'Create a new permission',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows permission information.',
  })
  @ApiCreatedResponse({
    type: Role,
    description: 'Permission has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async create(@Body() roleDto: Role): Promise<Role> {
    return this.permissionService.create(roleDto);
  }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of permissions information.',
    summary: 'List of all the permissions',
  })
  @ApiOkResponse({ type: [Role], description: 'List of all the permissions.' })
  async list(): Promise<Role[]> {
    return this.permissionService.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a permission by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows permission information.',
  })
  @ApiOkResponse({
    type: Role,
    description: 'Permission has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.permissionService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ description: 'Sets the permission properties.' })
  @ApiOperation({
    summary: 'Update a permission by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows permission information.',
  })
  @ApiOkResponse({
    type: Role,
    description: 'Permission has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async update(@Body() roleDto: Role): Promise<Role> {
    return this.permissionService.create(roleDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a permission by ID',
    description:
      'A successful request returns the HTTP 204 No Content status code with empty response body.',
  })
  @ApiNoContentResponse({
    description: 'Permission has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<any> {
    this.permissionService.delete(id);
  }
}
