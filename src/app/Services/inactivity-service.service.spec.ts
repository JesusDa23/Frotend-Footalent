import { TestBed } from '@angular/core/testing';

import { InactivityServiceService } from './inactivity-service.service';

describe('InactivityServiceService', () => {
  let service: InactivityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InactivityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
