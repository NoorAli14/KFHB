import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';
import { groupBy } from 'lodash';

@Injectable()
export class AmlResponseRepository extends BaseRepository {
  constructor() {
    super(TABLE.AML_RESPONSE);
  }

  async findByRequestId(
    ids: readonly string[],
    output: string[],
  ): Promise<any> {
    const responses = await this._connection(this._tableName)
      .select(output)
      .whereIn('request_id', ids)
      .orderBy('created_on', 'desc');
    return ids.map(request_id => groupBy(responses, 'request_id')[request_id]);
  }
}
