import { TestBed } from '@angular/core/testing';

import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutService = TestBed.inject(CheckoutService);
    expect(service).toBeTruthy();
  });
});
