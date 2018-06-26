import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewDetailComponent } from './product-review-detail.component';

describe('ProductReviewDetailComponent', () => {
  let component: ProductReviewDetailComponent;
  let fixture: ComponentFixture<ProductReviewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReviewDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
