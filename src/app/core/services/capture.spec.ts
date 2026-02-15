import { TestBed } from '@angular/core/testing';

import { Capture } from './capture';

describe('Capture', () => {
  let service: Capture;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Capture);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
