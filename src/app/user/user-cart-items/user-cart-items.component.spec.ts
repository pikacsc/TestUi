import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCartItemsComponent } from './user-cart-items.component';

describe('UserCartItemsComponent', () => {
  let component: UserCartItemsComponent;
  let fixture: ComponentFixture<UserCartItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCartItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
