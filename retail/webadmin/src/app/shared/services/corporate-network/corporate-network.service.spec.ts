import { TestBed } from '@angular/core/testing';

import { CorporateNetworkService } from './corporate-network.service';

describe('CorporateNetworkService', () => {
  let service: CorporateNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
