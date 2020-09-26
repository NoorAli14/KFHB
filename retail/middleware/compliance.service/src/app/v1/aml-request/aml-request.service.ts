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
    console.log(params, '\n', process.env.ENV_RBX_IDX_BASE_URL);

    const response = await this.http
      .post(process.env.ENV_RBX_IDX_BASE_URL, params, {
        headers: HttpHeaders(),
      })
      .pipe(map(res => res.data))
      .toPromise();

    return response;
  }

  async checkAmlByUser(user: any, keys: string[]): Promise<any> {
    console.log(user, '-=-=-=-=-');

    // we will get this from aml integrator
    // MOC JSON object start
    const newAmlRequest: any = {
      tenant_id: user.tenant_id,
      user_id: user.id,
      remarks: 'remarks from aml integrator',
      status: 'status from aml integrator',
      request_reference: 'aml integrator request reference',
      aml_text: JSON.stringify(user),
      created_by: user.email,
      created_on: new Date(),
      updated_by: user.email,
      updated_on: new Date(),
    };
    // MOC JSON object end

    const [response] = await this.amlRequestDB.create(newAmlRequest, keys);
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
