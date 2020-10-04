import { Injectable, Logger } from '@nestjs/common';
import {
  SESSION_STATUSES,
  ICurrentUser,
  DOCUMENT_TYPES,
  DOCUMENT_STATUSES,
  base64ToStr,
} from '@rubix/common';
import {
  SessionRepository,
  CustomerRepository,
  SessionReferenceRepository,
  DocumentTypeRepository
} from '@rubix/core';
import { Session } from './session.model';
import { IdentityService } from '@rubix/common/connectors';
import { NewFaceInput } from '../faces/face.dto';
import { NewSessionInput } from './session.dto';
import { EVALUATION_RESPONSE, MISMATCHED_DOCUMENT } from './session.interface';
import { SessionNotFoundException } from './exceptions';
import { SchemaService } from '../documents/schema.service';


@Injectable()
export class SessionsService {
  private readonly logger: Logger = new Logger(SessionsService.name);

  constructor(
    private readonly identityService: IdentityService,
    private readonly sessionDB: SessionRepository,
    private readonly documentTypeDB: DocumentTypeRepository,
    private readonly customerDB: CustomerRepository,
    private readonly sessionReferenceDB: SessionReferenceRepository,
    private readonly schema: SchemaService

  ) { }

  /**
   *
   * @param currentUser Current LoggedIn Customer
   * @param input
   * @param columns Graphql Fields, that need to be returned
   * @return The current active session object
   */
  async create(
    currentUser: ICurrentUser,
    input: NewSessionInput,
    columns?: string[],
  ): Promise<Session> {
    // Creating Identity User
    const targetUser: any = await this.identityService.createUser(
      input.reference_id,
    );

    // Creating Identity Check ID and Registration Challenge
    const [checkId, challenge] = await Promise.all([
      this.identityService.createCheckId(targetUser.id, input.reference_id),
      this.identityService.createRegistrationChallenge(input.reference_id),
    ]);

    // Session Input Params
    const params: any = {
      customer_id: currentUser.id,
      tenant_id: currentUser.tenant_id,
      target_user_id: targetUser.id,
      check_id: checkId.id,
      reference_id: input.reference_id,
      fido_reg_req_id: challenge.id,
      fido_reg_req: challenge.fidoRegistrationRequest,
      status: SESSION_STATUSES.ACTIVE,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    };

    const trx: any = await this.customerDB.transaction();
    try {
      // Creating Session
      const [session] = await this.sessionDB.create(params, columns, trx);
      await this.customerDB.update(
        { id: currentUser.id },
        { session_id: session.id, is_evaluation_verified: null },
        ['id'],
        trx,
      );
      await trx.commit();
      return session;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  /**
   *
   * @param currentUser Current LoggedIn Customer
   * @param input
   * @param columns Graphql Fields, that need to be returned
   * @return The current active session object
   */
  async update(
    currentUser: ICurrentUser,
    input: NewFaceInput,
    output: string[],
  ): Promise<Session> {
    // Fetch current user recent active session
    const customerSession: any = await this.customerDB.getRecentSession(
      currentUser.tenant_id,
      currentUser.id,
    );
    // Update existing registration challenge on Document Processing server
    const challenge: any = await this.identityService.updateRegistrationChallenge(
      customerSession.fido_reg_req_id,
      {
        file: base64ToStr(input.file),
      },
    );
    const trx: any = await this.customerDB.transaction();
    try {
      // Update session `fido_reg_req` with updated registration challenge response
      const [session] = await this.sessionDB.update(
        { id: customerSession.session_id },
        { fido_reg_req: challenge.fidoRegistrationRequest },
        output,
        trx,
      );
      await trx.commit();
      return session;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  /**
   *
   * @param currentUser Current LoggedIn Customer
   * @param columns Graphql Fields, that need to be returned
   * @return The EVALUATION_RESPONSE object
   */

  async evaluation(currentUser: ICurrentUser): Promise<EVALUATION_RESPONSE> {

    //  Fetch customer recent active session
    const [customerSession, types] = await Promise.all([this.customerDB.getRecentSession(
      currentUser.tenant_id,
      currentUser.id,
    ), this.documentTypeDB.findByTenantId(currentUser.tenant_id)]);

    if (!customerSession)
      throw new SessionNotFoundException()
    // Find Target User from Document Processing Server
    // const targetUser: any = await this.identityService.findUserById(customerSession.target_user_id);

    // this.logger.log(targetUser);
    // // Checking user has uploaded his selfie or not.
    // if (!targetUser?.faceEnrolled) {
    //   return {
    //     success: false,
    //     status: `CUSTOMER_${DOCUMENT_TYPES.SELFIE}_MISSING`,
    //   };
    // }

    const DOCUMENTS = types.filter(type => type.record_type === 'DOCUMENT');

    // Fetch all uploaded Documents
    const documents: any = await this.sessionReferenceDB.recentDocumentByType(
      customerSession.session_id,
      DOCUMENTS.map(record => record.name),
    );

    this.logger.log(`Uploaded Documents: [${documents.map(record => record.name)}]`)

    this.logger.log(`Required Documents: [${DOCUMENTS.filter(record => record.is_required).map(record => record.name)}]`)
    // Check if any required document is missing
    const missingDocument: string | boolean = this.findMissingDocument(
      DOCUMENTS.filter(record => record.is_required).map(record => record.name),
      documents || [],
    );
    if (missingDocument) {
      this.logger.log(`Missing Document: [${missingDocument}]`)
      return {
        success: false,
        status: `CUSTOMER_${missingDocument}_MISSING`,
      };
    }

    // Check if any documents is in processing or in failed state
    const processingOrFailedDocument = documents.find(
      document => (document.status === DOCUMENT_STATUSES.PROCESSING || document.status === DOCUMENT_STATUSES.FAILED),
    )
    if (processingOrFailedDocument) {
      this.logger.log(`[${processingOrFailedDocument.status}] Document: [${processingOrFailedDocument.name}]`)
      return {
        success: false,
        status: processingOrFailedDocument.status === DOCUMENT_STATUSES.PROCESSING ? `CUSTOMER_${processingOrFailedDocument.name}_PROCESSING` : `CUSTOMER_${processingOrFailedDocument.name}_PROCESSING_FAILED`,
      };
    }

    // // Fetch evaluation result from Document Processing server
    // const evaluation: any = await this.identityService.createEvaluation(
    //   customerSession.target_user_id,
    //   customerSession.check_id,
    // );

    // // Updating evaluation_id of current active session
    // await this.sessionDB.update(
    //   { id: customerSession.session_id },
    //   { evaluation_id: evaluation.id },
    //   ['id'],
    // );

    // // Find any mismatched document in evaluation result.
    // const mismatchedDocument:
    //   | boolean
    //   | MISMATCHED_DOCUMENT = this.findMismatchedDocument(
    //     evaluation,
    //     documents,
    //   );


    // // If any mismatched Document found then throw exception
    // if (mismatchedDocument) {
    //   return {
    //     success: false,
    //     status: `EVALUATION_MISMATCHED_${mismatchedDocument['name']}`,
    //     message: `Evaluation failed due to ${mismatchedDocument['name']} mismatched.`,
    //   };
    // }
    const PROCESSED_MRZ = {};
    documents.forEach(document => {
      PROCESSED_MRZ[document.name] = JSON.parse(document.processed_data)
    });

    const result: any = this.schema.mapAttributes(PROCESSED_MRZ) || {};
    if (!result.valid) {
      return result;
    }
    this.logger.log(`Customer Schema on Evaluation Success: ${JSON.stringify(result.data, null, 2)}`);

    // Save information in customer table
    await this.customerDB.update(
      { id: customerSession.id },
      { ...result.data, is_evaluation_verified: true, updated_by: customerSession.id },
      ['id'],
    );

    // Return success response
    return {
      success: true,
      status: 'MATCH',
      message: 'Evaluation operation has been successfully passed.',
    };
  }

  findMismatchedDocument(evaluation, documents): MISMATCHED_DOCUMENT | boolean {
    const regex: RegExp = /\/documents\/([^\/]+)\/?$/g;
    const __documents: { [key: string]: object } = {};
    for (let document of documents) {
      __documents[document.attachable_id] = document;
    }
    for (let item of evaluation.results.items) {
      if (
        item?.claimFace?.subtype === 'LIVENESS_FRAME_BLINK' &&
        item.result !== 'MATCH'
      ) {
        return {
          name: DOCUMENT_TYPES.LIVENESS,
          score: item.score,
          result: item.result,
        };
      } else if (item?.claimFace?.subtype === 'DOC_SERVER_EXTRACT') {
        const [, documentId] = regex.exec(item?.claimFace?.document?.href);
        if (__documents?.[documentId] && item.result !== 'MATCH')
          return {
            name: __documents?.[documentId]['name'],
            threshold: item.threshold,
            score: item.score,
            result: item.result,
          };
      }
    }
    return false;
  }

  findMissingDocument(__requiredDocuments, documents): string | boolean {
    // Pluck names of uploaded documents
    const uploadedDocuments: string[] = documents.map(ref => ref.name);
    // find missing documents
    return (
      __requiredDocuments.find(name => !uploadedDocuments.includes(name)) ||
      false
    );
  }
}
