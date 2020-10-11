import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  NotFoundException,
  UseGuards,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  AuthGuard,
  SuccessDto,
  USER_STATUSES,
  PermissionsGuard, Permissions
} from '@common/index';
import { UserService } from '@app/v1/users/users.service';
import { NewUserDto } from '@app/v1/users/user.dto';
import { User } from '@app/v1/users/user.entity';
import { UpdateInvitationDto } from './invitation.dto';
import { InvitationsService } from './invitations.service';

@ApiTags('Invitation')
@Controller('invitations')
export class InvitationsController {
  constructor(
    private readonly userService: UserService,
    private readonly invitationService: InvitationsService,
  ) { }

  @Post('/')
  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiBody({ description: 'Sets the user properties.', type: NewUserDto })
  @ApiOperation({
    summary: 'Send a invitation to a user',
    description:
      'A successful request returns the HTTP 201 CREATED status code and a JSON response body that shows user information.',
  })
  @ApiCreatedResponse({
    type: User,
    description: 'Invitation has been successfully sent.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  @Permissions('create:users')
  async create(
    @Body() input: NewUserDto,
  ): Promise<User> {
    return this.invitationService.invite(input);
  }

  @Get(':token')
  @ApiOperation({
    summary: 'Find a user by invitation token',
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
  @ApiBadRequestResponse({
    type: Error,
    description: 'Input Validation failed.',
  })
  async findOne(
    @Param('token') token: string,
  ): Promise<User> {
    const invitation = await this.userService.findByInvitationToken(
      token,
    );
    console.log(invitation);
    if (!invitation) {
      throw new NotFoundException('User Not Found');
    } else if (invitation.status != USER_STATUSES.PENDING) {
      throw new BadRequestException('User has been already onboard.');
    } else if (new Date() > new Date(invitation.invitation_token_expiry)) {
      throw new BadRequestException('Token is expired');
    }
    return this.userService.findOne(invitation.id);
  }

  @Put(':token')
  @ApiBody({
    description: 'Sets the user properties.',
    type: UpdateInvitationDto,
  })
  @ApiOperation({
    summary: 'Update a user by Invitation Token',
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
  @ApiNotFoundResponse({
    type: Error,
    description: 'User Not Found.',
  })
  async update(
    @Param('token') token: string,
    @Body() input: UpdateInvitationDto,
  ): Promise<User> {
    const invitation = await this.userService.findByInvitationToken(
      token,
    );
    if (!invitation) {
      throw new NotFoundException('User Not Found');
    } else if (invitation.status != USER_STATUSES.PENDING) {
      throw new BadRequestException('User has been already onboard.');
    }
    // } else if (new Date() > new Date(invitation.invitation_token_expiry)) {
    // throw new BadRequestException('Token is expired');
    // }
    return this.invitationService.acceptInvitation(
      invitation.id,
      input,
    );
  }

  @Get(':token/status')
  @ApiOperation({
    summary: 'Check Invitation Token Status',
    description: 'A successful request returns the HTTP 200 OK status code.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'Invitation Token Status',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'User Not Found.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'User has been already onboard.',
  })
  async invitationTokenStatus(
    @Param('token') token: string,
  ): Promise<SuccessDto> {
    const user = await this.userService.findByInvitationToken(token);
    if (!user) {
      throw new NotFoundException('User Not Found');
    } else if (user.status != USER_STATUSES.PENDING) {
      throw new BadRequestException('User has been already onboard.');
    }

    return {
      status:
        new Date(user.invitation_token_expiry) > new Date()
          ? 'SUCCESS'
          : 'EXPIRED',
      expired_at: user.invitation_token_expiry,
    };
  }

  @Post(':user_id/resend')
  @UseGuards(AuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Resend Invitation by User ID',
    description: 'A successful request returns the HTTP 200 OK status code.',
  })
  @ApiOkResponse({
    type: SuccessDto,
    description: 'Invitation has been successfully sent.',
  })
  @ApiNotFoundResponse({
    type: Error,
    description: 'User Not Found.',
  })
  @ApiBadRequestResponse({
    type: Error,
    description: 'User has been already onboard.',
  })
  @HttpCode(HttpStatus.OK)
  @Permissions('create:users')
  async resendInvitationLink(
    @Param('user_id') user_id: string,
  ): Promise<SuccessDto> {
    const user = await this.userService.findOne(
      user_id,
      `{id email status}`,
    );
    if (!user) {
      throw new NotFoundException('User Not Found');
    } else if (user.status != USER_STATUSES.PENDING) {
      throw new BadRequestException('User has been already onboard.');
    }
    return this.invitationService.resendInvitationLink(user.id);
  }
}
