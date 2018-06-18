import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductQnaComponent } from './admin-product-qna.component';

describe('AdminProductQnaComponent', () => {
  let component: AdminProductQnaComponent;
  let fixture: ComponentFixture<AdminProductQnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductQnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductQnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
