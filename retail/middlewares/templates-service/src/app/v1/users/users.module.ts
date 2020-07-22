import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { RepositoryModule } from 'src/core/repository/repository.module';
import { UserRepository } from 'src/core/repository/user.repository';

@Module({
  imports: [RepositoryModule],
  controllers: [UsersController],
  providers: [UserService, UserRepository, UsersResolver],
})
export class UsersModule {}
