import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';

describe('BookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookService = TestBed.inject(BookService);
    expect(service).toBeTruthy();
  });
});
