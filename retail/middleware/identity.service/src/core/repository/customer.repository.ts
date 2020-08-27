
import { Injectable } from '@nestjs/common';
import { TABLE } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class CustomerRepository extends BaseRepository {
  constructor() {
    super(TABLE.CUSTOMER);
  }
}
