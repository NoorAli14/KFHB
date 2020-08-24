import {
  Injectable,
  HttpService,
  RequestTimeoutException,
} from '@nestjs/common';
import { map, timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import {} from '@common/decorators';
@Injectable()
export class GqlClientService {
  constructor(private readonly http: HttpService) {}

  public async send(input: string): Promise<any> {
    const params = {
      query: input,
    };
    const headersRequest: any = {
      'x-user-id': '3D47E986-D5D6-45A0-92F4-9B0798827A5F',
      'x-tenant-id': `3D47E986-D5D6-45A0-92F4-9B0798827A5F`,
    };
    return this.http
      .post('/graphql', params, { headers: headersRequest })
      .pipe(
        map(response => {
          if (response.data?.errors) {
            console.log(
              `GQL Response Error: ${JSON.stringify(
                response.data?.errors,
                null,
                2,
              )}`,
            );
          }
          return response.data?.data;
        }),
        timeout(5000),
        catchError(err => {
          console.log(`GQL Error: ${JSON.stringify(err, null, 2)}`);
          if (err instanceof TimeoutError) {
            return throwError(new RequestTimeoutException());
          }
          return throwError(err);
        }),
      )
      .toPromise();
  }
}
