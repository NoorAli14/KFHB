import { TestBed } from '@angular/core/testing';

import { ErrorEmitterService } from './error-emitter.service';

describe('ErrorEmitterService', () => {
  let service: ErrorEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
