import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQnaDetailComponent } from './product-qna-detail.component';

describe('ProductQnaDetailComponent', () => {
  let component: ProductQnaDetailComponent;
  let fixture: ComponentFixture<ProductQnaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductQnaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQnaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
