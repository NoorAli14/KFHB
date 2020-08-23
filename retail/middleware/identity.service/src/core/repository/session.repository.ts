import { Injectable } from '@nestjs/common';
import { TABLE } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class SessionRepository extends BaseRepository {
  constructor() {
    super(TABLE.SESSION);
  }
}
