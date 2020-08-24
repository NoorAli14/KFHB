import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  NotFoundException,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@common/guards/';
import { UserService } from './users.service';
import { User } from './user.entity';
import { ChangePasswordDto, UpdateUserDto } from './user.dto';
import { SuccessDto } from '@common/dtos/';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows list of users information.',
    summary: 'List of all users.',
  })
  @ApiOkResponse({ type: [User], description: 'List of all users.' })
  async list(): Promise<User[]> {
    return this.userService.list();
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
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
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
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, userDto);
  }

  @Put('/password')
  @ApiBody({
    description: 'Sets the user properties.',
    type: ChangePasswordDto,
  })
  @ApiOperation({
    summary: 'Update user password',
    description: 'A successful request returns the HTTP 200 OK status code.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'User has been successfully updated their password.',
  })
  async update_password(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    // this.userService.create(userDto);
  }
}
