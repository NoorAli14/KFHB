import { Injectable, HttpService } from '@nestjs/common';
import { NewAlmRequestInput } from './aml-request-dot';
import { AmlRequest } from './aml.request.model';
import { AmlRequestRepository } from '@core/repository/aml-request-repository';
import { AmlResponseRepository } from '@core/repository/aml-response-repository';
import { map } from 'rxjs/operators';
import { ICurrentUser } from '@common/interfaces';
import { HttpHeaders } from '@core/context';

// import { GqlClientService, toGraphql } from '@common/index';

@Injectable()
export class AmlRequestService {
  constructor(
    private readonly http: HttpService,
    private readonly amlRequestDB: AmlRequestRepository,
    private readonly amlResponseDB: AmlResponseRepository,
  ) {}

  // Check if aml request against user already exist or not
  async getAmlRequestByUserId(
    currentUser: ICurrentUser,
    user_id: string,
    output: string[],
  ): Promise<any> {
    return this.amlRequestDB.findOne(
      {
        user_id: user_id,
        tenant_id: currentUser.tenant_id,
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
        tenant_id
        session_id
        email
        national_id_no
        gender
        nationality
        contact_no
        created_on
        created_by
        updated_on
        updated_by
        deleted_on
        deleted_by
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

  async create(currentUser: ICurrentUser, input: any, output: string[]) {
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
    const amlScreening = await this.http
      .post('http://localhost:3001/api/v1/aml/screening', {
        user: user,
        reference_no: amlRequest.request_reference,
      })
      .pipe(map(res => res.data))
      .toPromise();

    const [response] = await this.amlRequestDB.update(
      { id: amlRequest.id },
      { status: amlScreening.status },
      output,
    );

    const [result] = await this.amlResponseDB.create(
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
}
