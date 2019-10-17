import { TestBed } from '@angular/core/testing';

import { CustomValidationService } from './custom-validation.service';

describe('CustomValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomValidationService = TestBed.get(CustomValidationService);
    expect(service).toBeTruthy();
  });
});
