import { Injectable, Logger, Scope, Inject } from '@nestjs/common';
import {
  SESSION_STATUSES,
  ICurrentUser,
  DOCUMENT_TYPES,
  DOCUMENT_STATUSES,
} from '@rubix/common';
import {
  SessionRepository,
  CustomerRepository,
  SessionReferenceRepository,
} from '@rubix/core';
import { Session } from './session.model';
import { IdentityService } from '@rubix/common/connectors';
import { NewFaceInput } from '../faces/face.dto';
import { NewSessionInput } from './session.dto';
import { EVALUATION_RESPONSE, MISMATCHED_DOCUMENT } from './session.interface';
@Injectable()
export class SessionsService {
  private readonly logger: Logger = new Logger(SessionsService.name);

  constructor(
    private readonly identityService: IdentityService,
    private readonly sessionDB: SessionRepository,
    private readonly customerDB: CustomerRepository,
    private readonly sessionReferenceDB: SessionReferenceRepository,
  ) {}

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
    const trx: any = await this.customerDB.transaction();
    try {
      // Creating Identity User
      const targetUser: any = await this.identityService.createUser(
        input.reference_id,
      );

      // Creating Identity Check ID and Registration Challenge
      const promises = await Promise.all([
        this.identityService.createCheckId(targetUser.id, input.reference_id),
        this.identityService.createRegistrationChallenge(input.reference_id),
        this.sessionDB.update(
          { customer_id: currentUser.id },
          { status: SESSION_STATUSES.ARCHIVED },
          ['id'],
          trx,
        ),
      ]);

      // Session Input Params
      const params: any = {
        customer_id: currentUser.id,
        tenant_id: currentUser.tenant_id,
        target_user_id: targetUser.id,
        check_id: promises[0].id,
        reference_id: input.reference_id,
        fido_reg_req_id: promises[1].id,
        fido_reg_req: promises[1].fidoRegistrationRequest,
        status: SESSION_STATUSES.ACTIVE,
        created_by: currentUser.id,
        updated_by: currentUser.id,
      };

      // Creating Session
      const [session] = await this.sessionDB.create(params, columns, trx);

      // Update Customer with active session id
      await this.customerDB.update(
        { id: currentUser.id },
        { session_id: session.id },
        ['id'],
        trx,
      ),
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
        file: input.file,
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
    const __requiredDocuments: string[] = [
      DOCUMENT_TYPES.LIVENESS,
      DOCUMENT_TYPES.NATIONAL_ID_FRONT_SIDE,
      DOCUMENT_TYPES.NATIONAL_ID_BACK_SIDE,
      DOCUMENT_TYPES.PASSPORT,
    ];
    //  Fetch customer recent active session
    const customerSession = await this.customerDB.getRecentSession(
      currentUser.tenant_id,
      currentUser.id,
    );

    // Find Target User from Document Processing Server
    const targetUser: any = customerSession
      ? await this.identityService.findUserById(customerSession.target_user_id)
      : null;

    // Checking user has uploaded his selfie or not.
    if (!targetUser?.faceEnrolled) {
      return {
        success: false,
        status: `CUSTOMER_${DOCUMENT_TYPES.SELFIE}_MISSING`,
      };
    }

    // Fetch all required uploaded Documents
    const documents: any = await this.sessionReferenceDB.recentDocumentByType(
      customerSession.session_id,
      __requiredDocuments,
    );

    // Check if any required document is missing
    const missingDocument: string | boolean = this.findMissingDocument(
      __requiredDocuments,
      documents || [],
    );
    if (missingDocument) {
      return {
        success: false,
        status: `CUSTOMER_${missingDocument}_MISSING`,
      };
    }

    // Check if any document processing failed.
    const failedDocument = documents.find(
      document => document.status === DOCUMENT_STATUSES.FAILED,
    );

    if (failedDocument) {
      return {
        success: false,
        status: `CUSTOMER_${missingDocument}_PROCESSING_FAILED`,
      };
    } else {
      // Fetch evaluation result from Document Processing server
      const evaluation: any = await this.identityService.createEvaluation(
        customerSession.target_user_id,
        customerSession.check_id,
      );
      // Updating evaluation_id of current active session
      await this.sessionDB.update(
        { id: customerSession.session_id },
        { evaluation_id: evaluation.id },
        ['id'],
      );

      // Find any mismatched document in evaluation result.
      const mismatchedDocument:
        | boolean
        | MISMATCHED_DOCUMENT = this.findMismatchedDocument(
        evaluation,
        documents,
      );

      // If any mismatched Document found then throw exception
      if (mismatchedDocument) {
        return {
          success: false,
          status: `EVALUATION_MISMATCHED_${mismatchedDocument['name']}`,
          message: `Evaluation failed due to ${mismatchedDocument['name']} mismatched.`,
        };
      }

      // Find national id back
      const nationalID: any = documents.find(
        document => document.name === DOCUMENT_TYPES.NATIONAL_ID_BACK_SIDE,
      );

      // Prase processed_data to JSON
      const processed_data: { [key: string]: any } = JSON.parse(
        nationalID.processed_data,
      );

      // Save information in customer table
      await this.customerDB.update(
        { id: customerSession.id },
        {
          first_name: processed_data.mrz['Given Names'],
          last_name: processed_data.mrz['Surname'],
          date_of_birth: processed_data.mrz['Date Of Birth'],
          national_id_no: processed_data.mrz['Optional Data'],
          national_id_expiry: processed_data.mrz['Date Of Expiry'],
          nationality: processed_data.mrz['Nationality'],
          nationality_code: processed_data.mrz['Nationality Code'],
          gender: processed_data.mrz['Sex'],
        },
        ['id'],
      );
      // Return success response
      return {
        success: true,
        status: 'MATCH',
        message: 'Evaluation operation has been successfully passed.',
      };
    }
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
