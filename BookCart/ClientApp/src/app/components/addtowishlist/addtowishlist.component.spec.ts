import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddtowishlistComponent } from './addtowishlist.component';

describe('AddtowishlistComponent', () => {
  let component: AddtowishlistComponent;
  let fixture: ComponentFixture<AddtowishlistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtowishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtowishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
