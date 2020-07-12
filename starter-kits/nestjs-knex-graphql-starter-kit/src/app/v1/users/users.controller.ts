import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Param,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.class';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  @ApiResponse({ status: 200 })
  async list() {
    return this.userService.list();
  }
  @Post()
  @ApiCreatedResponse({ description: 'User has been successfully created.' })
  @ApiUnprocessableEntityResponse()
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(userDto);
    return user;
  }
  @Get(':id')
  @ApiOkResponse({
    description: 'The found record',
    type: User,
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
