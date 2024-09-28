import { TestBed } from '@angular/core/testing';

import { FlotaService } from './flota.service';

describe('FlotaService', () => {
  let service: FlotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
