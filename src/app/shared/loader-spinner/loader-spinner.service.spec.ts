import { TestBed, inject } from '@angular/core/testing';

import { LoaderSpinnerService } from './loader-spinner.service';

describe('LoaderSpinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderSpinnerService]
    });
  });

  it('should be created', inject([LoaderSpinnerService], (service: LoaderSpinnerService) => {
    expect(service).toBeTruthy();
  }));
});
