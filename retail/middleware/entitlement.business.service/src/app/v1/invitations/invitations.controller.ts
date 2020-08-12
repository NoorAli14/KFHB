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
import { InvitationService } from './invitations.service';
import { Role } from './invitation.entity';
import { RoleDto } from './invitation.dto';

@ApiTags('Invitation')
@Controller('invitations')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly roleService: InvitationService) {}

  @Post('/')
  @ApiBody({ description: 'Sets the user properties.' })
  @ApiOperation({
    summary: 'Send a invitation to a user',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows user information.',
  })
  @ApiCreatedResponse({
    type: Role,
    description: 'Invitation has been successfully sent.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async create(@Body() roleDto: Role): Promise<Role> {
    return this.roleService.create(roleDto);
  }

  @Get(':token')
  @ApiOperation({
    summary: 'Find a user by invitation token',
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

  @Put(':token')
  @ApiBody({ description: 'Sets the user properties.' })
  @ApiOperation({
    summary: 'Update a user by Invitation Token',
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

  @Post(':user_id/resend')
  @ApiOperation({
    summary: 'Resend Invitation by User ID',
    description: 'A successful request returns the HTTP 200 OK status code.',
  })
  @ApiNoContentResponse({
    description: 'Invitation has been successfully sent.',
  })
  async resend(@Param('user_id') user_id: string): Promise<any> {
    this.roleService.delete(user_id);
  }
}
