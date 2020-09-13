import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TABLE } from '@common/constants';
// import { AmlRequest } from '@app/v1/aml-request/aml.request.model';

@Injectable()
export class AmlRequestRepository extends BaseRepository {
  constructor() {
    super(TABLE.AML_REQUEST);
  }
}
