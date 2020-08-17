import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';

@Injectable()
export class SectionRepository extends BaseRepository {
  constructor() {
    super(TABLE.SECTION);
  }
  async findByTemplateId(
    template_ids: readonly string[],
    keys?: string[],
  ): Promise<any> {
    return this._connection(this._tableName)
      .select(keys || `${this._tableName}.*`)
      .whereIn('template_id', template_ids);
  }
}
