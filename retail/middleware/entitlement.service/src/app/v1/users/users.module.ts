import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

import { UserService } from './users.service';
import { RepositoryModule } from 'src/core/repository/repository.module';
import { UserRepository } from 'src/core/repository/user.repository';
import {Encrypter} from "@common/encrypter";

@Module({
  imports: [RepositoryModule],
  providers: [UserService, UserRepository, UsersResolver, Encrypter],
})
export class UsersModule {}
