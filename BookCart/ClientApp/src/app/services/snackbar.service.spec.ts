import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackbarService = TestBed.inject(SnackbarService);
    expect(service).toBeTruthy();
  });
});
