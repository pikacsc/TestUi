import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavouriteProductsComponent } from './user-favourite-products.component';

describe('UserFavouriteProductsComponent', () => {
  let component: UserFavouriteProductsComponent;
  let fixture: ComponentFixture<UserFavouriteProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFavouriteProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFavouriteProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
