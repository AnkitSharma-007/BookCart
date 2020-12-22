import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookFilterComponent } from './book-filter.component';

describe('BookFilterComponent', () => {
  let component: BookFilterComponent;
  let fixture: ComponentFixture<BookFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
