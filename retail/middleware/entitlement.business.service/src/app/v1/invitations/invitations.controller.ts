import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  NotFoundException,
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
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserService } from '@app/v1/users/users.service';
import { UpdateUserDto } from '@app/v1/users/user.dto';
import { User } from '@app/v1/users/user.entity';
import { UpdateInvitationDto } from './invitation.dto';
import { SuccessDto } from '@common/dtos/';

@ApiTags('Invitation')
@Controller('invitations')
@ApiBearerAuth()
export class InvitationsController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @ApiBody({ description: 'Sets the user properties.', type: UpdateUserDto })
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
  async create(@Body() userDto: UpdateUserDto): Promise<User> {
    return this.userService.create(userDto);
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
  async findOne(@Param('token') token: string): Promise<User> {
    const user = await this.userService.findOneByToken(token);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
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
    @Body() userDto: UpdateInvitationDto,
  ): Promise<User> {
    const user = await this.userService.findOneByToken(token);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return this.userService.updateByToken(token, userDto);
  }

  @Post(':user_id/resend')
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
  async resendInvitationLink(@Param('user_id') user_id: string): Promise<any> {
    const user = await this.userService.findOne(user_id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return this.userService.resendInvitationLink(user_id);
  }
}
