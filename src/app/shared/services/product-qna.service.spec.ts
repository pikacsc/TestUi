import { TestBed, inject } from '@angular/core/testing';

import { ProductQnaService } from './product-qna.service';

describe('ProductQnaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductQnaService]
    });
  });

  it('should be created', inject([ProductQnaService], (service: ProductQnaService) => {
    expect(service).toBeTruthy();
  }));
});
