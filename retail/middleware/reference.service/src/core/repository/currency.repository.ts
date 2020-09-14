import { Injectable } from '@nestjs/common';
import { TABLE, STATUS } from '@rubix/common/constants';
import { Currency } from '@app/v1/currencies/currency.modal';
import { BaseRepository } from './base.repository';

@Injectable()
export class CurrencyRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    'id',
    'name',
    'iso_code',
    'numeric_code',
    'minor_unit',
  ]
  constructor() {
    super(TABLE.CURRENCY);
  }
  async list(): Promise<Currency[]> {
    return this.connection(TABLE.CURRENCY).select(this.__attributes)
      .where({
        status: STATUS.ACTIVE,
        deleted_on: null,
      })
      .orderBy('name', 'asc');
  }
  async findById(id: string): Promise<Currency> {
    return super.findOne({
      id,
      status: STATUS.ACTIVE,
      deleted_on: null,
    },
      this.__attributes
    );
  }
}
