import { TestBed } from '@angular/core/testing';

import { PlanMyShoppingFormService } from './plan-my-shopping-form.service';

describe('PlanMyShoppingFormService', () => {
  let service: PlanMyShoppingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanMyShoppingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
