import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
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
} from '@nestjs/swagger';
import { ForgotPasswordService } from './forgot_password.service';
import { Header, IHEADER, SuccessDto } from '@common/index';

@ApiTags('Forgot Password')
@Controller('users/password')
@ApiBearerAuth()
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('/')
  @ApiBody({ description: 'Sets the user properties.' })
  @ApiOperation({
    summary: 'Send reset password link to a user',
    description: 'A successful request returns the HTTP 200 OK status code.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'Send reset password link.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @HttpCode(HttpStatus.OK)
  async sendResetPasswordLink(
    @Header() header: IHEADER,
    @Body() userDto: { email: string },
  ): Promise<SuccessDto> {
    return this.forgotPasswordService.sendResetPasswordLink(header, userDto);
  }

  @Get(':token')
  @ApiOperation({
    summary: 'Check reset password token status',
    description:
      'A successful request returns the HTTP 200 OK status code and a JSON response body that shows reset password token status.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'Check reset password token status.',
  })
  async checkStatus(
    @Header() header: IHEADER,
    @Param('token') token: string,
  ): Promise<SuccessDto> {
    return this.forgotPasswordService.checkStatus(header, token);
  }

  @Put(':token')
  @ApiBody({ description: 'Sets new password properties.' })
  @ApiOperation({
    summary: 'Update a user password by Reset Token',
    description: 'A successful request returns the HTTP 200 OK status code.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'Password has been successfully updated.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async changePassword(
    @Header() header: IHEADER,
    @Param('token') token: string,
    @Body() input: { password: string },
  ): Promise<SuccessDto> {
    return this.forgotPasswordService.changePassword(header, token, input);
  }
}
