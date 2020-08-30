import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';

describe('HttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInterceptorService = TestBed.inject(HttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
