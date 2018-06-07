import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderWriteComponent } from './user-order-write.component';

describe('UserOrderWriteComponent', () => {
  let component: UserOrderWriteComponent;
  let fixture: ComponentFixture<UserOrderWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrderWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
