import { Controller, Post, Get, Body, Put } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UserService } from '@app/v1/users/users.service';
import { UpdateUserDto } from '@app/v1/users/user.dto';
import { LoginUserDto } from './auth.dto';
import { User } from '@app/v1/users/user.entity';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @ApiOperation({
    summary: 'User Login',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows role information.',
  })
  @ApiCreatedResponse({
    type: User,
    description: 'User has been successfully loggedIn.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async login(@Body() userDto: LoginUserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  @Get('me')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows loggedIn user information.',
    summary: 'Fetch loggedIn User Profile by Token.',
  })
  @ApiOkResponse({ type: User, description: 'Current User Information.' })
  async list(): Promise<User> {
    return this.userService.findOne('123');
  }

  @Put('me')
  @ApiBody({ description: 'Sets the user properties.', type: UpdateUserDto })
  @ApiOperation({
    summary: 'Update loggedIn User Profile by Token.',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows user information.',
  })
  @ApiOkResponse({
    type: User,
    description: 'User Information has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async update(@Body() userDto: UpdateUserDto): Promise<User> {
    return this.userService.create(userDto);
  }
}
