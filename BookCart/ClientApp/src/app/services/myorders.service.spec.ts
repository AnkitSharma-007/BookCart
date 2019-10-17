import { TestBed } from '@angular/core/testing';

import { MyordersService } from './myorders.service';

describe('MyordersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyordersService = TestBed.get(MyordersService);
    expect(service).toBeTruthy();
  });
});
