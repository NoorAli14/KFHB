import {
  Controller,
  Get,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
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
import { AuthGuard, SuccessDto } from '@common/index';
import { UserService } from './users.service';
import { User } from './user.entity';
import { ChangePasswordDto, UpdateUserDto } from './user.dto';

@ApiTags('Customer')
@Controller('customers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

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
