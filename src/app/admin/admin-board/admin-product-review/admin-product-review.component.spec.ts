import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductReviewComponent } from './admin-product-review.component';

describe('AdminProductReviewComponent', () => {
  let component: AdminProductReviewComponent;
  let fixture: ComponentFixture<AdminProductReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
