import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { UserRepository } from '@rubix/core/repository/';
import { UserGQL } from '@rubix/app/v1/users/user.model';

@Injectable()
export class UserLoader implements NestDataLoader<string, UserGQL> {
  constructor(private readonly userDB: UserRepository) {}
  generateDataLoader(): DataLoader<string, UserGQL> {
    return new DataLoader<string, UserGQL>(IDs =>
      this.userDB.findByIds(IDs),
    );
  }
}