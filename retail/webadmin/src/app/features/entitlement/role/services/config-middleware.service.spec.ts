import { TestBed } from '@angular/core/testing';

import { ConfigMiddlewareService } from './config-middleware.service';

describe('ConfigMiddlewareService', () => {
  let service: ConfigMiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigMiddlewareService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
