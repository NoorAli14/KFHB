import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

import { UserService } from './users.service';
import { RepositoryModule } from 'src/core/repository/repository.module';
import { UserRepository } from 'src/core/repository/user.repository';
import {Encrypter} from "@common/encrypter";
import {RoleService} from "@app/v1/roles/roles.service";
import {RolesDataLoader} from "@app/v1/roles/roles.dataloader";
import {RolesModule} from "@app/v1/roles/roles.module";

@Module({
  imports: [RepositoryModule, RolesModule],
  providers: [
      UserService,
      UserRepository,
      UsersResolver,
      Encrypter,
      RolesDataLoader,
      RoleService],
})
export class UsersModule {}
