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
import { UserService } from './users.service';
import { Role } from './user.entity';
import { RoleDto } from './user.dto';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly roleService: UserService) {}

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of users information.',
    summary: 'List of all the modules',
  })
  @ApiOkResponse({ type: [Role], description: 'List of all the users.' })
  async list(): Promise<Role[]> {
    return this.roleService.list();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a user by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows user information.',
  })
  @ApiOkResponse({
    type: Role,
    description: 'User has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ description: 'Sets the user properties.' })
  @ApiOperation({
    summary: 'Update a user by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows user information.',
  })
  @ApiOkResponse({
    type: Role,
    description: 'User has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async update(@Body() roleDto: Role): Promise<Role> {
    return this.roleService.create(roleDto);
  }

  @Put('/password')
  @ApiOperation({
    summary: 'Update user password',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows user information.',
  })
  @ApiNoContentResponse({
    description: 'User has been successfully updated their password.',
  })
  async update_password(@Body() roleDto: Role): Promise<any> {
    this.roleService.create(roleDto);
  }
}
