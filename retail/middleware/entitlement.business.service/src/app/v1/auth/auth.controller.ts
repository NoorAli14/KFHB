import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
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
import { LocalAuthGuard } from './localAuth.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from '@common/decorators';
import { AuthGuard } from '@common/guards/';
import { X_ACCESS_TOKEN } from '@common/constants';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({
    summary: 'User Login',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows user information.',
  })
  @ApiCreatedResponse({
    type: User,
    description: 'User has been successfully loggedIn.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async login(@Res() response, @CurrentUser() user: User) {
    const token: string = this.authService.getToken(user.id);
    response.setHeader(X_ACCESS_TOKEN, token);
    response.setHeader(
      'Set-Cookie',
      this.authService.getCookieWithJwtToken(token),
    );
    return response.send(user);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows loggedIn user information.',
    summary: 'Fetch loggedIn User Profile by Token.',
  })
  @ApiOkResponse({ type: User, description: 'Current User Information.' })
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
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

  @Delete('logout')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 204 NO CONTENT status code.',
    summary: 'User Logout',
  })
  @UseGuards(AuthGuard)
  async logOut(@Res() response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(HttpStatus.NO_CONTENT);
  }
}
