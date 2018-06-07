import { TestBed, inject } from '@angular/core/testing';

import { QnaService } from './qna.service';

describe('QnaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QnaService]
    });
  });

  it('should be created', inject([QnaService], (service: QnaService) => {
    expect(service).toBeTruthy();
  }));
});
