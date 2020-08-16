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
  HttpCode
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';
import { Permission} from './permission.entity';
import { PermissionService } from './permissions.service';
import { PermissionDto } from './permission.dto';

@ApiTags('Permission')
@Controller('permissions')
@ApiBearerAuth()
export class PermissionsController {

  constructor(private readonly permissionService: PermissionService) {}

  @Post('/')
  @ApiBody({ description: 'Sets the permission properties.', type: PermissionDto})
  @ApiOperation({
    summary: 'Create a new permission',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows permission information.',
  })
  @ApiCreatedResponse({
    type: Permission,
    description: 'Permission has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async create(@Body() permissionDto: PermissionDto): Promise<Permission> {
    return this.permissionService.create(permissionDto);
  }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of permissions information.',
    summary: 'List of all the permissions',
  })
  @ApiOkResponse({ type: [Permission], description: 'List of all the permissions.' })
  async list(): Promise<Permission[]> {
    return this.permissionService.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a permission by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows permission information.',
  })
  @ApiOkResponse({
    type: Permission,
    description: 'Permission has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Permission Not Found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Permission> {
    const permission = await this.permissionService.findOne(id);
    if(!permission) {
      throw new NotFoundException('Permission Not Found');
    }
    return permission;
  }

  @Put(':id')
  @ApiBody({ description: 'Sets the permission properties.' , type: PermissionDto})
  @ApiOperation({
    summary: 'Update a permission by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows permission information.',
  })
  @ApiOkResponse({
    type: Permission,
    description: 'Permission has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'Permission Not Found.',
  })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() permissionDto: PermissionDto): Promise<Permission> {
    const permission = await this.permissionService.findOne(id);
    if(!permission) {
      throw new NotFoundException('Permission Not Found');
    }
    return this.permissionService.update(id, permissionDto);
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
  @ApiNotFoundResponse({
    type: Error,
    description: 'Permission Not Found.',
  })
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const permission = await this.permissionService.findOne(id);
    if(!permission) {
      throw new NotFoundException('Permission Not Found');
    }
    return this.permissionService.delete(id);
  }
}
