import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQnaComponent } from './admin-qna.component';

describe('AdminQnaComponent', () => {
  let component: AdminQnaComponent;
  let fixture: ComponentFixture<AdminQnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
