import { Injectable, HttpService } from '@nestjs/common';
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
  async findUserById(user_id: string): Promise<any> {
    const gqlQuery = `query {
      findCustomerById(id: "${user_id}") {  
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

  async checkAmlByUser(user: object): Promise<any> {
    return 'here we call identity service to fetch customer detail';
  }

  async create(
    newAmlRequest: NewAlmRequestInput,
    keys?: string[],
  ): Promise<AmlRequest> {
    const [response] = await this.amlRequestDB.create(newAmlRequest, keys);
    return response;
  }
}
