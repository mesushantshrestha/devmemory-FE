import { TestBed } from '@angular/core/testing';

import { CaptureApiService } from './capture-api-service';

describe('CaptureApiService', () => {
  let service: CaptureApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaptureApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
