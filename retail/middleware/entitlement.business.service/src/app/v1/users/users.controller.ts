import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { AuthGuard, PermissionsGuard, Permissions, PaginationDTO, SortByDTO } from '@common/index';
import { UserService } from './users.service';
import { User, UserPaginationList } from './user.entity';
import { UpdateUserDto } from './user.dto';
import { Query } from "@nestjs/common";
import { UserFilterDto } from "@app/v1/users/dtos";

@ApiTags('User')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of users information with pagination.',
    summary: 'List of all users.',
  })
  @ApiOkResponse({ type: UserPaginationList, description: 'List of all users.' })
  @Permissions('view:users')
  async list(@Query() pagination: PaginationDTO, @Query() filters: UserFilterDto, @Query() sort_by: SortByDTO): Promise<UserPaginationList> {
    return this.userService.list({ pagination, filters, sort_by });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a user by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows user information.',
  })
  @ApiOkResponse({
    type: User,
    description: 'User has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'User Not Found.',
  })
  @Permissions('view:users')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ description: 'Sets the user properties.', type: UpdateUserDto })
  @ApiOperation({
    summary: 'Update a user by ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows user information.',
  })
  @ApiOkResponse({
    type: User,
    description: 'User has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'User Not Found.',
  })
  @Permissions('edit:users')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a User by ID',
    description:
      'A successful request returns the HTTP 204 No Content status code with empty response body.',
  })
  @ApiNoContentResponse({
    description: 'User has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'User Not Found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions('delete:users')
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<any> {
    return this.userService.delete(id);
  }

  @Put(':id/link/:entity_id')
  @ApiBody({ description: 'Associates user with the specified Entity ID.' })
  @ApiOperation({
    summary: 'Associate a user with Entity ID',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows user information.',
  })
  @ApiOkResponse({
    type: User,
    description: 'User has been successfully associated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'User Not Found.',
  })
  @Permissions('edit:users')
  async updateEntityID(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('entity_id', ParseUUIDPipe) entity_id: string,
  ): Promise<User> {
    return this.userService.update(id, {entity_id: entity_id});
  }
}
