import { TestBed } from '@angular/core/testing';

import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubscriptionService = TestBed.inject(SubscriptionService);
    expect(service).toBeTruthy();
  });
});
