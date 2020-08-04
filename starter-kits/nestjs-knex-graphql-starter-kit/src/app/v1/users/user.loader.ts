import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { UserService } from './users.service';
import { UserGQL } from './user.model';

@Injectable()
export class UserLoader implements NestDataLoader<string, UserGQL> {
  constructor(private readonly userService: UserService) {}
  generateDataLoader(): DataLoader<string, UserGQL> {
    return new DataLoader<string, UserGQL>(keys =>
      this.userService.findByIds(keys),
    );
  }
}