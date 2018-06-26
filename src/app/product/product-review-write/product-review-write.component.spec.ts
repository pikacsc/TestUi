import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewWriteComponent } from './product-review-write.component';

describe('ProductReviewWriteComponent', () => {
  let component: ProductReviewWriteComponent;
  let fixture: ComponentFixture<ProductReviewWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReviewWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
