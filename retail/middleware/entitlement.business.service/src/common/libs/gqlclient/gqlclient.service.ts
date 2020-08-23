import {
  Injectable,
  HttpService,
  RequestTimeoutException,
} from '@nestjs/common';
import { map, timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';

@Injectable()
export class GqlClientService {
  constructor(private readonly http: HttpService) {}

  public async send(input: string): Promise<any> {
    const params = {
      query: input,
    };
    return this.http
      .post('/graphql', params)
      .pipe(
        map(response => response.data?.data),
        timeout(5000),
        catchError(err => {
          if (err instanceof TimeoutError) {
            return throwError(new RequestTimeoutException());
          }
          return throwError(err);
        }),
      )
      .toPromise();
  }
}
