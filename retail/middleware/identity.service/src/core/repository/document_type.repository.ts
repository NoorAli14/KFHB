import { Injectable } from '@nestjs/common';
import { TABLE } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class DocumentTypeRepository extends BaseRepository {
  private readonly __attributes: string[] = ['id', 'name', 'status'];
  constructor() {
    super(TABLE.DOCUMENT_TYPE);
  }

  async findByName(name: string, columns?: string[]): Promise<any> {
    return super.findOne(
      { name, deleted_on: null },
      columns || this.__attributes,
    );
  }
}
