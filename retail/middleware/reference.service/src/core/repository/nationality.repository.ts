import { Injectable } from '@nestjs/common';
import { TABLE } from '@rubix/common/constants';
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
  async list(): Promise<any> {
    return this.connection(TABLE.NATIONALITY).select(this.__attributes)
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
