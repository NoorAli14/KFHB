import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Delete,
  Put,
  Param,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.model';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  @ApiResponse({ status: 200 })
  async list(): Promise<User[]> {
    return this.userService.list();
  }
  @Post()
  @ApiCreatedResponse({
    description: 'User has been successfully created.',
  })
  @ApiUnprocessableEntityResponse()
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(userDto);
    return user;
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'User has been successfully update.',
  })
  @ApiUnprocessableEntityResponse()
  async update(
    @Param('id') id: string,
    @Body() userDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.userService.update(id, userDto);
    return user;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The found record',
    type: User,
  })
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findById(id);
      if (!user) throw new NotFoundException(`User not fuond`);
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'User successfully delete',
  })
  delete(@Param('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
}
