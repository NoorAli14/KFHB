import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './users.repository';
@Module({
  controllers: [UsersController],
  providers: [UserService, UserRepository],
})
export class UsersModule {}
