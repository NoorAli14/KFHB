import { Injectable } from '@nestjs/common';
import { TABLE } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class CountryRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    'id',
    'name',
    'iso_code',
    'continent_code',
    'phone_code',
    'currency_code',
    'status',
    'created_by',
    'updated_by',
    'deleted_by',
    'created_on',
    'updated_on',
    'deleted_on',
  ]
  constructor() {
    super(TABLE.COUNTRY);
  }
  async list(): Promise<any> {
    return this.connection(TABLE.COUNTRY).select(this.__attributes)
      .where({
        status: 'ACTIVE',
        deleted_on: null,
      })
      .orderBy('name', 'asc');
  }
  async findById(id: string): Promise<any> {
    return super.findOne({
      id,
      status: 'ACTIVE',
      deleted_on: null,
    },
      this.__attributes
    );
  }
}
