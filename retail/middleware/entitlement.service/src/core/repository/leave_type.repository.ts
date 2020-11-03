import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class LeaveTypeRepository extends BaseRepository {
  constructor() {
    super(TABLE.LEAVE_TYPE);
  }
}
