import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpHelper {
  private http;
  private headers;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.http = this.httpClient;
    this.headers = this.prepareHeader(null);
    // new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'x-transid': '1010111111101011111110101111111010111111145241',
    //   'x-channel-id': 'INT',
    //   Accept: 'application/json, text/plain, */*'
    // });
  }

  getParam(param: any) {
    return this.route.snapshot.paramMap.get('id');
  }

  getHttp() {
    return this.http;
  }

  getHttpHeaders() {
    return this.headers;
  }
  prepareHeader(headers: HttpHeaders | null): object {
    headers = headers || new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('x-channel-id', 'INT');
    headers = headers.set(
      'x-transid',
      '1010111111101011111110101111111010111111145241'
    );
    headers = headers.set('Accept', 'application/json, text/plain, */*');

    return {
      headers
    };
  }
}
