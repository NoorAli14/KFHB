import { Injectable } from '@nestjs/common';
import { TABLE, STATUS } from '@rubix/common/constants';
import { Country } from '@app/v1/countries/country.modal'
import { BaseRepository } from './base.repository';

@Injectable()
export class CountryRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    'id',
    'name',
    'iso_code',
    'continent_code',
    'phone_code',
    'nationality',
  ]

  constructor() {
    super(TABLE.COUNTRY);
  }

  async list(): Promise<Country[]> {
    return this.connection(TABLE.COUNTRY).select(this.__attributes)
      .where({
        status: STATUS.ACTIVE,
        deleted_on: null,
      })
      .orderBy('name', 'asc');
  }

  async findById(id: string): Promise<Country> {
    return super.findOne({
      id,
      status: STATUS.ACTIVE,
      deleted_on: null,
    },
      this.__attributes
    );
  }
}
