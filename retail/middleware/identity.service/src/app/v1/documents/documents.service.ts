import { Injectable, Logger, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  SessionRepository,
  CustomerRepository,
  DocumentTypeRepository,
  SessionReferenceRepository,
} from '@rubix/core';
import { Document } from './document.model';
import { Customer } from '../customers/customer.model';
import { IdentityService } from '@rubix/common/http/';
import { DOCUMENT_STATUSES, ICurrentUser } from '@rubix/common/';
@Injectable({ scope: Scope.REQUEST })
export class DocumentsService {
  private readonly logger: Logger = new Logger(DocumentsService.name);
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly identityService: IdentityService,
    private readonly documentTypeDB: DocumentTypeRepository,
    private readonly sessionReferenceDB: SessionReferenceRepository,
    private readonly sessionDB: SessionRepository,
    private readonly customerDB: CustomerRepository,
  ) {
    console.log(`Deocument Request Headers: ${this.request.headers}`);
  }

  async getCustomer(input): Promise<Customer> {
    const customer: any = await this.customerDB.findByIdAndTenentId(
      input.customer_id,
      input.tenant_id,
    );
    console.log(`Customer is: ${JSON.stringify(customer, null, 2)}`);
    return customer;
  }

  async getSession(id: string): Promise<any> {
    return this.sessionDB.findById(id);
  }

  async create(
    currentUser: ICurrentUser,
    input: { [key: string]: any },
    columns?: string[],
  ): Promise<Document> {
    const trx: any = await this.customerDB.transaction();
    try {
      const promises = await Promise.all([
        this.documentTypeDB.findByName(input.type),
        this.customerDB.getRecentSession(currentUser.tenant_id, currentUser.id),
      ]);
      const customerSession: any = promises[1];
      const identityDocument: any = await this.identityService.createDocument(
        customerSession.target_user_id,
        customerSession.check_id,
        {
          file: input.file,
          unprocessedImage: input.unprocessed,
        },
      );
      const params: { [key: string]: string } = {
        tenant_id: currentUser.tenant_id,
        session_id: customerSession.session_id,
        document_type_id: promises[0].id,
        status: DOCUMENT_STATUSES.PROCESSING,
        attachable_id: identityDocument.id,
        created_by: currentUser.id,
        updated_by: currentUser.id,
      };
      const [document] = await this.sessionReferenceDB.create(
        params,
        columns,
        trx,
      );
      await trx.commit();
      return document;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async process(
    input: { [key: string]: any },
    columns?: string[],
  ): Promise<Document> {
    const customer: Customer = await this.getCustomer(input);
    const reference: any = await this.sessionReferenceDB.recentDocumentByType(
      customer.session_id,
      input.type,
    );
    if (reference?.status === DOCUMENT_STATUSES.PROCESSING) {
      const status: any = await this.identityService.getDocument(
        reference.target_user_id,
        reference.check_id,
        reference.attachable_id,
      );
      const _input: { [key: string]: any } = {
        updated_by: customer.id,
        status:
          DOCUMENT_STATUSES[status?.processingStatus] ||
          DOCUMENT_STATUSES.FAILED,
      };

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
        }
      }
      const [sessionRef] = await this.sessionReferenceDB.update(
        { id: reference.id },
        _input,
        columns,
      );
      return sessionRef;
    } else {
      return reference;
    }
  }
}

// async delete(id: string): Promise<boolean> {
//   return await this.userDB.delete({ id });
// }
// }
