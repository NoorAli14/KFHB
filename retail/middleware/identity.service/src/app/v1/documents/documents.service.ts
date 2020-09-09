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
    input: { [key: string]: any },
    columns?: string[],
  ): Promise<Document> {
    const trx: any = await this.customerDB.transaction();
    try {
      const customer: Customer = await this.getCustomer(input);
      const session: any = await this.getSession(customer.session_id);
      const documentType: any = await this.documentTypeDB.findByName(
        input.type,
      );
      const identityDocument: any = await this.identityService.createDocument(
        session.target_user_id,
        session.check_id,
        {
          file: input.file,
          unprocessedImage: input.unprocessed,
        },
      );
      delete input.type;
      delete input.file;
      delete input.unprocessed;
      delete input.customer_id;

      const params: { [key: string]: string } = {
        ...input,
        ...{
          session_id: session.id,
          document_type_id: documentType.id,
          attachable_id: identityDocument.id,
        },
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
}

// async delete(id: string): Promise<boolean> {
//   return await this.userDB.delete({ id });
// }
// }
