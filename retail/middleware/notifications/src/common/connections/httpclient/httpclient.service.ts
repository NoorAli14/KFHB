import {
    Injectable,
    HttpService,
    Logger,
  } from '@nestjs/common';
  @Injectable()
  export class httpClientService {
    private readonly logger: Logger = new Logger(httpClientService.name);
    constructor(private readonly http: HttpService) {}
    public async send(url : string, params: {}, headers? : {} ): Promise<any> {
      return this.http
        .post(
          url,
          params,
        {
            headers: headers? headers : {
                'Content-Type': 'application/json',
            },
        }
        ).toPromise();
    }
  }