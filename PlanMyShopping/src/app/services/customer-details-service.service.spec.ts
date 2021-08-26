import { TestBed } from '@angular/core/testing';

import { CustomerDetailsService } from './customer-details.service';

describe('CustomerDetailsServiceService', () => {
  let service: CustomerDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
