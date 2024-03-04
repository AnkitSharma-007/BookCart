import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSummaryComponent } from './book-summary.component';

describe('BookSummaryComponent', () => {
  let component: BookSummaryComponent;
  let fixture: ComponentFixture<BookSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
