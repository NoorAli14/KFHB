import { Injectable, Logger } from '@nestjs/common';
import {
  CustomerRepository,
  DocumentTypeRepository,
  SessionReferenceRepository,
} from '@rubix/core';
import { Face } from './face.model';
import { IdentityService } from '@rubix/common/http/';
import {
  DOCUMENT_STATUSES,
  ICurrentUser,
  DOCUMENT_TYPES,
} from '@rubix/common/';
import { NewFaceInput } from './face.dto';

@Injectable()
export class FacesService {
  private readonly logger: Logger = new Logger(FacesService.name);
  constructor(
    private readonly identityService: IdentityService,
    private readonly documentTypeDB: DocumentTypeRepository,
    private readonly sessionReferenceDB: SessionReferenceRepository,
    private readonly customerDB: CustomerRepository,
  ) {}

  async uploadLiveness(
    currentUser: ICurrentUser,
    input: NewFaceInput,
    columns?: string[],
  ): Promise<Face> {
    const trx: any = await this.customerDB.transaction();
    try {
      const promises = await Promise.all([
        this.documentTypeDB.findByName(DOCUMENT_TYPES.LIVENESS),
        this.customerDB.getRecentSession(currentUser.tenant_id, currentUser.id),
      ]);
      const customerSession: any = promises[1];
      const liveness: any = await this.identityService.createLiveness(
        customerSession.target_user_id,
        customerSession.check_id,
        {
          file: input.file,
        },
      );
      const params: { [key: string]: string } = {
        tenant_id: currentUser.tenant_id,
        session_id: customerSession.session_id,
        document_type_id: promises[0].id,
        status: DOCUMENT_STATUSES.PROCESSED,
        attachable_id: liveness.id,
        created_by: currentUser.id,
        updated_by: currentUser.id,
      };

      const [sessionRef] = await this.sessionReferenceDB.create(
        params,
        columns,
        trx,
      );
      await trx.commit();
      return sessionRef;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
