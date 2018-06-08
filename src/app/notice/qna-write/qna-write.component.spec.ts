import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaWriteComponent } from './qna-write.component';

describe('QnaWriteComponent', () => {
  let component: QnaWriteComponent;
  let fixture: ComponentFixture<QnaWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnaWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnaWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
