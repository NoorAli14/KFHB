import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { UserRepository } from '@rubix/core/repository/';
import { User } from '@rubix/app/v1/users/user.model';

@Injectable()
export class UserLoader implements NestDataLoader<string, User> {
  constructor(private readonly userDB: UserRepository) {}

  generateDataLoader(): DataLoader<string, User> {
    return new DataLoader<string, User>(IDs =>
      this.userDB.findByIdsLoader(IDs),
    );
  }
}
