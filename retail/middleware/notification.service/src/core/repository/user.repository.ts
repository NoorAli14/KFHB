import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class UserRepository extends BaseRepository {
  constructor() {
    super(TABLE.USER);
  }
}
