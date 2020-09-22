import { Injectable, HttpService, Logger } from '@nestjs/common';
import { NewAlmRequestInput } from './aml-request-dot';
import { AmlRequest } from './aml.request.model';
import { AmlRequestRepository } from '@core/repository/aml-request-repository';
import { map } from 'rxjs/operators';

// import { GqlClientService, toGraphql } from '@common/index';

@Injectable()
export class AmlRequestService {
  constructor(
    private readonly http: HttpService,
    private readonly amlRequestDB: AmlRequestRepository,
  ) {}
  //Get customer details
  async findById(customer_id: string): Promise<any> {
    const gqlQuery = `query {
      result: findCustomerById(id: "${customer_id}") {  
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
      .post('http://localhost:4010/graphql', params, {
        headers: {
          'x-tenant-id': '9013C327-1190-4875-A92A-83ACA9029160',
          'x-user-id': '828605C2-7E50-40BC-AA88-C064CE63C155',
        },
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
      customer_id: user.id,
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
