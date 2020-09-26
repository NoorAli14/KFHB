import { Injectable, HttpService } from '@nestjs/common';
import { NewAlmRequestInput } from './aml-request-dot';
import { AmlRequest } from './aml.request.model';
import { AmlRequestRepository } from '@core/repository/aml-request-repository';
import { map } from 'rxjs/operators';
import { ICurrentUser } from '@common/interfaces';
import { HttpHeaders } from '@core/context';

// import { GqlClientService, toGraphql } from '@common/index';

@Injectable()
export class AmlRequestService {
  constructor(
    private readonly http: HttpService,
    private readonly amlRequestDB: AmlRequestRepository,
  ) {}

  // Check if aml request against user already exist or not
  async getAmlRequestByUserId(
    currentUser: ICurrentUser,
    user_id: string,
    output: string[],
  ): Promise<any> {
    const [response] = await this.amlRequestDB.findOne(
      {
        user_id: user_id,
        tenant_id: currentUser.tenant_id,
        deleted_on: null,
        // deleted_on: null,
      },
      output,
    );
    return response;
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
      .pipe(map(res => res.data))
      .toPromise();

    return response;
  }

  async checkAmlByUser(
    currentUser: ICurrentUser,
    user: any,
    output: string[],
  ): Promise<any> {
    // we will get this from aml integrator
    // MOC JSON object start
    const newAmlRequest: any = {
      tenant_id: currentUser.tenant_id,
      user_id: user.id,
      remarks: 'remarks from aml integrator',
      status: 'status from aml integrator',
      request_reference: 'aml integrator request reference',
      aml_text: JSON.stringify(user),
      created_by: currentUser.id,
      created_on: new Date(),
      updated_by: currentUser.id,
      updated_on: new Date(),
    };
    // MOC JSON object end

    const aml_data = await this.http
      .post('http://localhost:3001/api/v1/aml/screening')
      .pipe(map(res => res.data))
      .toPromise();

    const [response] = await this.amlRequestDB.create(
      { ...newAmlRequest, status: (aml_data && aml_data.status) || 'BLOCK' },
      output,
    );
    return response;
  }

  async create(
    newAmlRequest: NewAlmRequestInput,
    keys?: string[],
  ): Promise<AmlRequest> {
    const [response] = await this.amlRequestDB.create(newAmlRequest, keys);
    return response;
  }
}
