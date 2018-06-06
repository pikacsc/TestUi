import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestProductComponent } from './best-product.component';

describe('BestProductComponent', () => {
  let component: BestProductComponent;
  let fixture: ComponentFixture<BestProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
