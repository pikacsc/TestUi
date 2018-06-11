import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QnaUpdateComponent } from './qna-update.component';

describe('QnaUpdateComponent', () => {
  let component: QnaUpdateComponent;
  let fixture: ComponentFixture<QnaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QnaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QnaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
