import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewUpdateComponent } from './product-review-update.component';

describe('ProductReviewUpdateComponent', () => {
  let component: ProductReviewUpdateComponent;
  let fixture: ComponentFixture<ProductReviewUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReviewUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
