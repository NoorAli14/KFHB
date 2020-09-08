import { Request } from 'express';
import * as fs from 'fs';
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
  Res,
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
  Header,
  IHEADER,
} from '@common/index';
import { UserService } from '@app/v1/users/users.service';
import { CurrentUserUpdateDto } from '@app/v1/users/user.dto';
import { RegisterCustomerDto } from './auth.dto';
import { User as Customer } from '@app/v1/users/user.entity';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly customerService: UserService,
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
  @Post('/register')
  @ApiOperation({
    summary: 'Register new Customer',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows customer information.',
  })
  @ApiOkResponse({
    type: Customer,
    description: 'Customer has been successfully registered.',
  })
  @ApiUnauthorizedResponse({
    type: Error,
    description: 'Wrong credentials',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async register(
    @Req() request: Request,
    @Body() input: RegisterCustomerDto,
    @Header() header: IHEADER,
  ): Promise<Customer> {
    const customer: any = await this.customerService.create(header, input);
    const refreshToken: string = await this.authService.getRefreshToken(
      customer.id,
    );
    request.res = this.authService.setHeaders(
      request.res,
      refreshToken,
      customer.id,
    );
    return customer;
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOperation({
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows loggedIn customer information.',
    summary: 'Fetch loggedIn customer Profile by Token.',
  })
  @ApiOkResponse({
    type: Customer,
    description: 'Current Customer Information.',
  })
  @ApiBearerAuth(X_ACCESS_TOKEN)
  async me(@CurrentUser() customer: Customer): Promise<Customer> {
    return customer;
  }

  @Put('me')
  @UseGuards(AuthGuard)
  @ApiBody({
    description: 'Sets the customer properties.',
    type: CurrentUserUpdateDto,
  })
  @ApiOperation({
    summary: 'Update loggedIn Customer Profile by Token.',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows customer information.',
  })
  @ApiOkResponse({
    type: Customer,
    description: 'Customer Information has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @ApiBearerAuth()
  async update(
    @CurrentUser() customer: Customer,
    @Body() input: CurrentUserUpdateDto,
  ): Promise<Customer> {
    return this.customerService.update(customer.id, input);
  }

  @Delete('logout')
  @ApiOperation({
    description:
      'A successful request returns the HTTP 204 NO CONTENT status code.',
    summary: 'Customer Logout',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async logOut(@Req() request: Request, @CurrentUser() customer: Customer) {
    request.res.setHeader(
      'Set-Cookie',
      await this.authService.getCookieForLogOut(customer.id),
    );
    return null;
  }
}
