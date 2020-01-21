import { TestBed, inject } from '@angular/core/testing';

import { HandleApiErrorService } from './handle-api-error.service';

describe('HandleApiErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandleApiErrorService]
    });
  });

  it('should be created', inject([HandleApiErrorService], (service: HandleApiErrorService) => {
    expect(service).toBeTruthy();
  }));
});
