import { Request } from 'express';
import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
  Req,
  Headers,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  X_ACCESS_TOKEN,
  X_REFRESH_TOKEN,
  AuthGuard,
  CurrentUser,
  SuccessDto,
  IHEADER,
  Header,
} from '@common/index';
import { UserService } from '@app/v1/users/users.service';
import {
  ChangePasswordDto,
  CurrentUserUpdateDto,
} from '@app/v1/users/user.dto';
import { User } from '@app/v1/users/user.entity';
import { LocalAuthGuard } from './localAuth.guard';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('refresh-token')
  @ApiOperation({
    description: 'A successful request returns the HTTP 200 OK status.',
    summary: 'Generate new access token.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'Generate new user access token.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: `x-refresh-token can't be blank`,
  })
  @ApiUnauthorizedResponse({
    type: Error,
  })
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Headers(X_REFRESH_TOKEN) refresh_token: string,
    @Req() request: Request,
  ): Promise<SuccessDto> {
    if (!refresh_token)
      throw new BadRequestException(`${X_REFRESH_TOKEN} can't be blank`);
    const payload: any = await this.authService.validateRefreshToken(
      refresh_token,
    );
    if (!payload) throw new UnauthorizedException();
    request.res = this.authService.setHeaders(
      request.res,
      refresh_token,
      payload.aud,
    );
    return {
      status: 'SUCCESS',
      message: `${X_ACCESS_TOKEN} has been successfully generated.`,
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({
    summary: 'User Login',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows user information.',
  })
  @ApiOkResponse({
    type: User,
    description: 'User has been successfully loggedIn.',
  })
  @ApiUnauthorizedResponse({
    type: Error,
    description: 'Wrong credentials',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async login(@Req() request: Request, @CurrentUser() user: User) {
    const refreshToken: string = await this.authService.getRefreshToken(
      user.id,
    );
    request.res = this.authService.setHeaders(
      request.res,
      refreshToken,
      user.id,
    );
    return user;
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows loggedIn user information.',
    summary: 'Fetch loggedIn User Profile by Token.',
  })
  @ApiOkResponse({ type: User, description: 'Current User Information.' })
  @ApiBearerAuth()
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Put('me')
  @UseGuards(AuthGuard)
  @ApiBody({
    description: 'Sets the user properties.',
    type: CurrentUserUpdateDto,
  })
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
  @ApiBearerAuth()
  async update(
    @Header() header: IHEADER,
    @CurrentUser() user: User,
    @Body() input: CurrentUserUpdateDto,
  ): Promise<User> {
    return this.userService.update(header, user.id, input);
  }

  @Put('password')
  @UseGuards(AuthGuard)
  @ApiBody({
    description: 'Sets the chnage password properties.',
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
    @Header() header: IHEADER,
    @Body() input: ChangePasswordDto,
  ): Promise<SuccessDto> {
    const result: any = await this.userService.changePassword(header, input);
    if (!result?.id) {
      return {
        status: 'FAILED',
        message: 'Invalid current password.',
      };
    }
    return {
      status: 'SUCCESS',
      message: 'Password has been successfully updated.',
    };
  }

  @Delete('logout')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 204 NO CONTENT status code.',
    summary: 'User Logout',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async logOut(@Req() request: Request, @CurrentUser() user: User) {
    request.res.setHeader(
      'Set-Cookie',
      await this.authService.getCookieForLogOut(user.id),
    );
    return null;
  }
}
