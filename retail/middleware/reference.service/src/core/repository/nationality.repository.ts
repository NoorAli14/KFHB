import { Injectable } from '@nestjs/common';
import { TABLE, STATUS } from '@rubix/common/constants';
import { Nationality } from '@app/v1/nationalities/nationality.modal';
import { BaseRepository } from './base.repository';

@Injectable()
export class NationalityRepository extends BaseRepository {
  private readonly __attributes: string[] = [
    'id',
    'name',
    'country_code',
    'status',
    'created_by',
    'updated_by',
    'created_on',
    'updated_on',
  ]
  constructor() {
    super(TABLE.NATIONALITY);
  }
  async list(): Promise<Nationality[]> {
    return this.connection(TABLE.NATIONALITY).select(this.__attributes)
      .where({
        status: STATUS.ACTIVE,
        deleted_on: null,
      })
      .orderBy('name', 'asc');
  }
  async findById(id: string): Promise<Nationality> {
    return super.findOne({
      id,
      status: STATUS.ACTIVE,
      deleted_on: null,
    },
      this.__attributes
    );
  }
}
