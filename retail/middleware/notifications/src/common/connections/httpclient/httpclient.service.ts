import { Injectable, HttpService, Logger } from '@nestjs/common';
@Injectable()
export class HttpClientService {
  private readonly logger: Logger = new Logger(HttpClientService.name);
  constructor(private readonly http: HttpService) {}
  public async send(
    url: string,
    params: { [key: string]: any },
    headers?: { [key: string]: any },
  ): Promise<any> {
    return this.http
      .post(url, params, {
        headers: headers
          ? headers
          : {
              'Content-Type': 'application/json',
            },
      })
      .toPromise();
  }
}
