import { Injectable, HttpService, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ConfigurationService } from '@common/configuration/configuration.service';
import { ICurrentUser } from '@common/interfaces';
import { HttpHeaders } from '@core/context';
import { AmlRequest } from './aml.request.model';
import { AML_REQUEST_STATUSES, CREATED_BY } from '@common/constants';
import { AlmRequestAlertInput } from './aml-request-dto';
import {
  AmlRequestRepository,
  AmlResponseRepository,
  TemplateResponsesRepository,
} from '@root/src/core/repository';
import { TemplateResponseNotFoundException } from './exceptions';
import { base64ToStr } from '@root/src/common/utilities';
// import { GqlClientService, toGraphql } from '@common/index';

@Injectable()
export class AmlRequestService {
  private readonly logger: Logger = new Logger(AmlRequestService.name);
  constructor(
    private readonly http: HttpService,
    private readonly amlRequestDB: AmlRequestRepository,
    private readonly amlResponseDB: AmlResponseRepository,
    private readonly TemplateResponseDB: TemplateResponsesRepository,
    private readonly config: ConfigurationService,
  ) {}

  async list(
    currentUser: ICurrentUser,
    user_id: string,
    output: string[],
  ): Promise<AmlRequest[]> {
    return this.amlRequestDB.findBy(
      {
        user_id: user_id,
        tenant_id: currentUser.tenant_id,
        deleted_on: null,
      },
      output,
    );
  }

  // Check if aml request against user already exist or not
  async getAmlRequestByUserId(
    currentUser: ICurrentUser,
    user_id: string,
    output: string[],
  ): Promise<AmlRequest> {
    return this.amlRequestDB.findOne(
      {
        user_id: user_id,
        tenant_id: currentUser.tenant_id,
        deleted_on: null,
      },
      output,
    );
  }

  async getAmlRequestByReferenceNo(
    reference_no: string,
    output: string[],
  ): Promise<AmlRequest> {
    return this.amlRequestDB.findOne(
      {
        request_reference: reference_no,
        deleted_on: null,
      },
      output,
    );
  }
  //Get customer details
  async findById(currentUser: ICurrentUser, user_id: string): Promise<any> {
    const gqlQuery = `query {
      result: findCustomerById(id: "${user_id}") {  
        id
        first_name
        last_name
        middle_name
        email
        national_id_no
        gender
        nationality
        contact_no
        national_id_expiry
        date_of_birth
      }
    }`;

    const params = { query: gqlQuery };

    const response = await this.http
      .post(process.env.ENV_RBX_IDX_BASE_URL, params, {
        headers: HttpHeaders(),
      })
      .pipe(map(res => res.data?.data?.result))
      .toPromise();

    return response;
  }

  async create(
    currentUser: ICurrentUser,
    input: any,
    output: string[],
  ): Promise<AmlRequest> {
    // MOC JSON object start
    const newAmlRequest: any = {
      status: null,
      remarks: null,
      user_id: input.id,
      created_by: currentUser.id,
      updated_by: currentUser.id,
      aml_text: JSON.stringify(input),
      tenant_id: currentUser.tenant_id,
      request_reference: new Date().getTime(),
    };
    // MOC JSON object end

    const [response] = await this.amlRequestDB.create(newAmlRequest, output);
    return response;
  }

  async triggerAml(amlRequest: any, output: string[]): Promise<any> {
    const user = JSON.parse(amlRequest.aml_text);

    //Get user templates details
    const templateResponse = await this.TemplateResponseDB.findOne(
      {
        user_id: amlRequest.user_id,
        // tenant_id: amlRequest.tenant_id,
        deleted_on: null,
      },
      output,
    );

    // Check template response exist against the user or not
    if (!templateResponse)
      throw new TemplateResponseNotFoundException(amlRequest.user_id);

    //Decode kyc response from base64 string
    const kycInfo = base64ToStr(templateResponse.results);

    const amlScreening = await this.http
      .post(process.env.ENV_RBX_AML_BASE_URL, {
        user: user,
        reference_no: amlRequest.request_reference,
        kycInfo: JSON.parse(kycInfo),
      })
      .pipe(map(res => res.data))
      .toPromise();
    this.logger.log(amlScreening);
    const [response] = await this.amlRequestDB.update(
      { id: amlRequest.id },
      { status: amlScreening.status },
      output,
    );

    await this.amlResponseDB.create(
      {
        request_id: response.id,
        status: amlScreening.status,
        created_by: response.created_by,
        updated_by: response.updated_by,
        response_text: JSON.stringify(amlScreening),
      },
      ['id'],
    );

    return response;
  }

  async amlAlert(
    input: AlmRequestAlertInput,
    output: string[],
  ): Promise<AmlRequest> {
    const [response] = await this.amlRequestDB.update(
      {
        request_reference: input.reference_no,
        deleted_on: null,
      },
      {
        status:
          input.response_code == this.config.AML.SUCCESS_CODE
            ? AML_REQUEST_STATUSES.CLEAN
            : AML_REQUEST_STATUSES.BLOCK,
        updated_by: CREATED_BY.API,
      },
      output,
    );
    return response;
  }
}
