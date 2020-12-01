import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';
@Injectable()
export class AppointmentRepository extends BaseRepository {
  constructor() {
    super(TABLE.APPOINTMENT);
  }
}
