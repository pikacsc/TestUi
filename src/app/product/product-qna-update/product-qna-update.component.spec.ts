import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQnaUpdateComponent } from './product-qna-update.component';

describe('ProductQnaUpdateComponent', () => {
  let component: ProductQnaUpdateComponent;
  let fixture: ComponentFixture<ProductQnaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductQnaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQnaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
