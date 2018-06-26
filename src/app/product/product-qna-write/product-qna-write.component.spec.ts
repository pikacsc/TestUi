import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQnaWriteComponent } from './product-qna-write.component';

describe('ProductQnaWriteComponent', () => {
  let component: ProductQnaWriteComponent;
  let fixture: ComponentFixture<ProductQnaWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductQnaWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQnaWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
