import { TestBed } from '@angular/core/testing';

import { ErrorInterceptorService } from './error-interceptor.service';

describe('ErrorInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorInterceptorService = TestBed.inject(ErrorInterceptorService);
    expect(service).toBeTruthy();
  });
});
