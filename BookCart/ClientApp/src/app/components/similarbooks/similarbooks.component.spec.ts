import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimilarbooksComponent } from './similarbooks.component';

describe('SimilarbooksComponent', () => {
  let component: SimilarbooksComponent;
  let fixture: ComponentFixture<SimilarbooksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
