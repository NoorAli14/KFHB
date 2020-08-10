import { Module } from '@nestjs/common';
import { RepositoryModule } from '@rubix/core/repository/repository.module';
import { UserRepository } from '@rubix/core/repository/';
import { UsersResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    UserService,
    UserRepository,
    UsersResolver  ],
})
export class UsersModule {}
