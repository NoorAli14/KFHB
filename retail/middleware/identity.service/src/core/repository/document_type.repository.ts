import { Injectable } from '@nestjs/common';
import { TABLE, DOCUMENT_TYPE_STATUSES } from '@rubix/common/constants';
import { BaseRepository } from './base.repository';

@Injectable()
export class DocumentTypeRepository extends BaseRepository {
  private readonly __attributes: string[] = ['id', 'name', 'record_type', 'is_required', 'status'];
  constructor() {
    super(TABLE.DOCUMENT_TYPE);
  }

  async findByName(name: string, columns?: string[]): Promise<any> {
    return super.findOne(
      { name, deleted_on: null },
      columns || this.__attributes,
    );
  }

  async findByTenantId(tenant_id: string, columns?: string[]): Promise<any> {
    return super.findBy({ tenant_id, status: DOCUMENT_TYPE_STATUSES.ACTIVE, deleted_on: null }, columns || this.__attributes)
  }
}
