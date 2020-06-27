import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  @ApiResponse({ status: 200 })
  async list() {
    return this.userService.list();
  }
  // public async details(@CurrentUser() currentUser: ICurrentUser) {
  //   const user = this.userRepository.findById(currentUser.id);
  //   if (!user) throw new NotFoundException();

  //   return user;
  // }
}
