import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  UseGuards,
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
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthGuard, Header, IHEADER } from '@common/index';
import { Permission } from './permission.entity';
import { PermissionService } from './permissions.service';
import { PermissionDto } from './permission.dto';

@ApiTags('Permission')
@Controller('permissions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PermissionsController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('/')
  @ApiBody({
    description: 'Sets the permission properties.',
    type: PermissionDto,
  })
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
  async create(
    @Header() header: IHEADER,
    @Body() permissionDto: PermissionDto,
  ): Promise<Permission> {
    return this.permissionService.create(header, permissionDto);
  }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of permissions information.',
    summary: 'List of all the permissions',
  })
  @ApiOkResponse({
    type: [Permission],
    description: 'List of all the permissions.',
  })
  async list(@Header() header: IHEADER): Promise<Permission[]> {
    return this.permissionService.list(header);
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
  async findOne(
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Permission> {
    const permission: Permission = await this.permissionService.findOne(
      header,
      id,
    );
    if (!permission) throw new NotFoundException(`Permission not found.`);
    return permission;
  }

  @Put(':id')
  @ApiBody({
    description: 'Sets the permission properties.',
    type: PermissionDto,
  })
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
  async update(
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() permissionDto: PermissionDto,
  ): Promise<Permission> {
    return this.permissionService.update(header, id, permissionDto);
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
  async delete(
    @Header() header: IHEADER,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.permissionService.delete(header, id);
  }
}
