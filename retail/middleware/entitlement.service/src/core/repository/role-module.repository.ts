import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class RoleModuleRepository extends BaseRepository {
  constructor() {
    super(TABLE.ROLE_MODULE);
  }
}
