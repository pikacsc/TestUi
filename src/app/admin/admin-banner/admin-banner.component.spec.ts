import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBannerComponent } from './admin-banner.component';

describe('AdminBannerComponent', () => {
  let component: AdminBannerComponent;
  let fixture: ComponentFixture<AdminBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
