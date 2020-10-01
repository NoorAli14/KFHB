import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  SessionRepository,
  CustomerRepository,
  DocumentTypeRepository,
  SessionReferenceRepository,
} from '@rubix/core';
import { CUSTOM_ERROR, Document, PreviewDocument, SCHEMA_ERROR } from './document.model';
import { IdentityService } from '@rubix/common/connectors';
import {
  DOCUMENT_STATUSES,
  ICurrentUser,
  DOCUMENT_TYPES,
} from '@rubix/common/';
import { SchemaService, ISCHEMA_ERROR } from './schema.service';
import { SessionNotFoundException } from '@app/v1/sessions/exceptions/';
import { DocumentNotFoundException } from './exceptions/';
@Injectable()
export class DocumentsService {
  private readonly logger: Logger = new Logger(DocumentsService.name);
  constructor(
    private readonly identityService: IdentityService,
    private readonly documentTypeDB: DocumentTypeRepository,
    private readonly sessionReferenceDB: SessionReferenceRepository,
    private readonly sessionDB: SessionRepository,
    private readonly customerDB: CustomerRepository,
    private readonly schema: SchemaService
  ) { }

  async create(
    currentUser: ICurrentUser,
    input: { [key: string]: any },
    columns?: string[],
  ): Promise<Document> {
    const [document, customerSession] = await Promise.all([
      this.documentTypeDB.findByName(input.type),
      this.customerDB.getRecentSession(currentUser.tenant_id, currentUser.id),
    ]);
    if (!document)
      throw new DocumentNotFoundException();
    if (!customerSession)
      throw new SessionNotFoundException();
    const identityDocument: any = await this.identityService.createDocument(
      customerSession.target_user_id,
      customerSession.check_id,
      {
        file: input.file,
        unprocessedImage: input.unprocessed,
      },
    );
    const trx: any = await this.customerDB.transaction();
    try {
      const params: { [key: string]: string } = {
        tenant_id: currentUser.tenant_id,
        session_id: customerSession.session_id,
        document_type_id: document.id,
        status: DOCUMENT_STATUSES.PROCESSING,
        attachable_id: identityDocument.id,
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

  async process(
    currentUser: ICurrentUser,
    input: { [key: string]: any },
    output: string[],
  ): Promise<Document | CUSTOM_ERROR> {

    //  Fetch customer recent active session
    const customerSession = await this.customerDB.getRecentSession(
      currentUser.tenant_id,
      currentUser.id,
    );
    if (!customerSession) {
      this.logger.log(`Session not exit with customer ID [${currentUser.id}]`)
      throw new SessionNotFoundException()
    }
    const [reference]: any = await this.sessionReferenceDB.recentDocumentByType(
      customerSession.session_id,
      input.type,
    );

    if (!reference) {
      this.logger.log(`Document not exit with customer ID [${currentUser.id}]`)
      throw new DocumentNotFoundException();
    }
    if (reference?.status === DOCUMENT_STATUSES.PROCESSING) {
      const status: any = await this.identityService.getDocument(
        reference.target_user_id,
        reference.check_id,
        reference.attachable_id,
      );
      const _input: { [key: string]: any } = {
        updated_by: customerSession.id,
        status:
          DOCUMENT_STATUSES[status?.processingStatus] ||
          DOCUMENT_STATUSES.FAILED,
        processed_data: null
      };
      let result: CUSTOM_ERROR = { valid: true, errors: null }
      if (status?.processingStatus === DOCUMENT_STATUSES.PROCESSED) {
        const processedData: any = await this.identityService.getServerProcessedOCRSensitiveData(
          reference.target_user_id,
          reference.check_id,
          reference.attachable_id,
        );
        if (processedData) {
          const sanitizeData: { [key: string]: any } = {
            mrz: this.identityService.sanitize(processedData.mrz),
            visualZone: this.identityService.sanitize(processedData.visualZone),
          };
          _input.processed_data = JSON.stringify(sanitizeData);
          result = this.schema.validate(input.type, sanitizeData?.mrz);
          if (!result.valid) {
            _input.status = DOCUMENT_STATUSES.FAILED;
          }
        }
      }
      const [sessionRef] = await this.sessionReferenceDB.update(
        { id: reference.id },
        _input,
        output,
      );
      if (!result.valid) {
        return result;
      }
      return sessionRef;
    } else if (reference?.status === DOCUMENT_STATUSES.FAILED && reference?.processed_data) {
      const data = JSON.parse(reference.processed_data)
      const result = this.schema.validate(input.type, data.mrz);
      if (!result.valid) {
        return result;
      }
    }
    return reference;
  }

  async preview(input: any): Promise<PreviewDocument> {
    this.logger.log(input);

    const reference: any = await this.sessionReferenceDB.getDocumentByCustomerAndId(
      input.customer_id,
      input.attachment_id,
    );

    this.logger.log(reference);

    //  Fetch Liveness base64 Content
    if (reference?.name === DOCUMENT_TYPES.LIVENESS) {
      const image: any = await this.identityService.getLivenessImage(
        reference.target_user_id,
        reference.check_id,
        reference.attachable_id,
      );
      return { image: image.value };
    }
    // Fetch Document Base64 Content
    else if (
      [
        DOCUMENT_TYPES.NATIONAL_ID_FRONT_SIDE,
        DOCUMENT_TYPES.NATIONAL_ID_BACK_SIDE,
        DOCUMENT_TYPES.PASSPORT,
        DOCUMENT_TYPES.DRIVING_LICENSE,
      ].includes(reference.name)
    ) {
      const image: any = await this.identityService.getProcessedClientImage(
        reference.target_user_id,
        reference.check_id,
        reference.attachable_id,
      );
      return { image: image.value };
    }
  }
}
