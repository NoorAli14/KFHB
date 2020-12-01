import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';

import {UserRepository} from "@core/repository";
import {User} from "@app/v1/users/user.model";
import {loaderSerializer} from "@rubix/common";

@Injectable()
export class UsersLoader {
  constructor(private readonly userDB: UserRepository) {}

  async findUsers(keys: readonly string[]): Promise<any> {
    const result = await this.userDB.listUsersByIds(keys);
    return loaderSerializer(result, keys, 'id');
  }
}

@Injectable()
export class UsersDataLoader implements NestDataLoader<string, User[]> {
  constructor(private readonly loader: UsersLoader) {}

  generateDataLoader(): DataLoader<string, User[]> {
    return new DataLoader<string, User[]>(keys =>
      this.loader.findUsers(keys),
    );
  }
}
